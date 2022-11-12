import React, {useState, useEffect, Children, useRef} from 'react';
import {connect} from "react-redux";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  Image,
  ScrollView,
  Dimensions,
  Platform
} from 'react-native';
import { action_getProductList } from '../actions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
let width = Dimensions.get('window').width;
let cdnURL = 'https://cdn.esyms.com/'

const list = [
    {
        id: 1,
        uri: "https://cdn.esyms.com/product/product_20210602133925-f74cd306-4c23-48d6-8bec-fb78cdde23e4.png"
    },
    {
        id: 1,
        uri: "https://cdn.esyms.com/product/product_20191122050638ae710a19-3754-4663-9ec2-e1ac38f2506b.gif"
    },
    {
        id: 1,
        uri: "https://cdn.esyms.com/product/product_20201015092400e6204958-5d87-4dfc-ba11-57b30ea936bb.png"
    },
    {
        id: 1,
        uri: "https://cdn.esyms.com/product/product_20201015092400e6204958-5d87-4dfc-ba11-57b30ea936bb.png"
    },
    {
        id: 1,
        uri: "https://cdn.esyms.com/product/product_20201015092400e6204958-5d87-4dfc-ba11-57b30ea936bb.png"
    },
    {
        id: 1,
        uri: "https://cdn.esyms.com/product/product_20201015092400e6204958-5d87-4dfc-ba11-57b30ea936bb.png"
    },
    {
        id: 1,
        uri: "https://cdn.esyms.com/product/product_20201015092400e6204958-5d87-4dfc-ba11-57b30ea936bb.png"
    },
]
 
class HomeScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            currentPage: 1,
            list: [],
            loadMore: false,
        }
    }

    UNSAFE_componentWillMount(){
        let param = {
            name: 'Goli',
            page: this.state.currentPage
        }
        this.props.action_getProductList(param)
    }

    UNSAFE_componentWillReceiveProps(props){

        const {
            listProduct
        } = props;

        if(listProduct && listProduct.message == 'success'){
            this.setState({list: this.state.list.concat(listProduct.results.docs)}, () => console.log(this.state.list))
        }
    }

    isCloseToBottom({layoutMeasurement, contentOffset, contentSize}){
        if(this.state.loadMore){
            return;
        }
        const paddingToBottom = Platform.OS == 'ios' ? 5 : 10;
        if(layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
            this.setState({loadMore: true, currentPage: this.state.currentPage + 1}, () => {
                this.props.action_getProductList({name: 'Goli', page: this.state.currentPage })
            })
        }
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <StatusBar barStyle='light-content' backgroundColor="#6CC8BE"  />
                <View style={{height: 'auto', width: '100%', position: 'absolute', top: 0, backgroundColor: '#6CC8BE', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', padding: 16, paddingBottom: 5}}>
                    <TouchableOpacity style={styles.searchBar}>
                        <MaterialCommunityIcons name='magnify' color={'grey'} size={25}/>
                        <Text style={{color: 'grey', fontSize: 14, marginLeft: 10}}>Start exploring...</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cartButton}>
                        <View style={{position: 'absolute', width: 16, height: 16, borderRadius: 16/2, backgroundColor: 'red', top: -5, right: -5, zIndex: 999, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontFamily: 'Inter-Bold', fontSize: 8}}>13</Text>
                        </View>
                        <MaterialCommunityIcons name='cart' size={25} color={'#fff'}/>
                    </TouchableOpacity>
                </View>
                <ScrollView 
                    style={{ flex: 1, marginTop: 55, paddingTop: 0 }} 
                    contentContainerStyle={{paddingBottom: 20, paddingLeft: 10}}
                    onScroll={({nativeEvent}) => { this.isCloseToBottom(nativeEvent) }}
                    scrollEventThrottle={16}
                >
                    <View style={{width: width * 2, position: 'absolute', top: -50, left: 0, height: 150, backgroundColor: '#6CC8BE'}}/>
                    <View style={{padding: 14, marginTop: 5}}>
                        <Image source={{uri : "https://cdn.esyms.com/product/product_20210602133904-ff660085-25d6-4d03-a38e-6022a402d3bc.png"}} style={{height: 164, width:'98%', borderRadius:8}} />
                    </View>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 8}}>
                    {
                        this.state.list?.map((key, index) => {
                            return(
                                <TouchableOpacity key={index} style={styles.GridViewBlockStyle}>
                                    <Image source={{uri : cdnURL + key?.img[0].src}} style={{height: 170, width:'100%', borderRadius:8}} />
                                    <View style={{width: '100%', backgroundColor: '#fff', borderBottomLeftRadius: 8, borderBottomRightRadius: 8, paddingVertical: 5}}>
                                        <Text style={{color: '#000', fontFamily: 'Inter-Bold', fontSize: 14}}>{key?.name.en}</Text>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <Text style={{color: '#8F8F8F', fontSize: 11, fontFamily: 'Inter-Medium', textDecorationLine: 'line-through'}}>{'MYR ' + key?.price}</Text>
                                            <Text style={{color: '#33A197', fontSize: 14, fontFamily: 'Inter-Bold', marginLeft: 5}}>{'MYR ' + key?.specialPrice}</Text>
                                        </View>
                                        {key?.rating ?
                                            <View>
                                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                    <MaterialCommunityIcons name='star' color='gold' size={14} />
                                                    <Text style={{color: '#000', marginLeft: 5, fontSize: 11}}>{key?.rating}</Text>
                                                </View>
                                            </View> 
                                        : null}
                                        
                                        
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }  
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}
 
const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        width: 300,
        marginTop: 16,
    },
    searchBar: {
        flex: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 4,
        paddingHorizontal: 15,
        borderRadius: 50,
        marginRight: 5
    },
    cartButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    GridViewBlockStyle: {
        // justifyContent: 'flex-end',
        // flex:1,
        alignItems: 'flex-start',
        width: 164,
        minHeight: 264,
        marginVertical: 8,
        marginHorizontal: 8,
        backgroundColor: '#fff',
        borderRadius: 8
    },
    GridViewInsideTextItemStyle: {
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        margin: 3.5,
    },
});

function mapStateToProps({list}) {
    const {listProduct} = list;

    return {listProduct};
}

export default connect( mapStateToProps, { action_getProductList } )(HomeScreen);