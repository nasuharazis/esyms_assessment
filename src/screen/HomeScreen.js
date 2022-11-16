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
            this.setState({list: this.state.list.concat(listProduct.results.docs)})
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
            <>
                <StatusBar barStyle='light-content' backgroundColor="#6CC8BE"  />
                {
                    Platform.OS == 'ios' && <View style={{backgroundColor:"#6CC8BE", width: '100%', height: 47, position: 'absolute', top: 0, zIndex: 999}}/>
                }

                <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>

                <View style={styles.header}>
                    <TouchableOpacity style={styles.searchBar}>
                        <MaterialCommunityIcons name='magnify' color={'grey'} size={25}/>
                        <Text style={{color: 'grey', fontSize: 14, marginLeft: 10}}>Start exploring...</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cartButton}>
                        <View>
                            <View style={styles.badge}>
                                <Text style={{fontFamily: 'Inter-Bold', fontSize: 8, color: '#fff'}}>13</Text>
                            </View>
                            <MaterialCommunityIcons name='cart' size={25} color={'#fff'}/>
                        </View>
                    </TouchableOpacity>
                </View>

                <ScrollView
                    contentContainerStyle={{paddingBottom: 20}}
                    onScroll={({nativeEvent}) => { this.isCloseToBottom(nativeEvent)}}
                    bounces={false}
                    alwaysBounceVertical={false}
                    scrollEventThrottle={16}
                >
                    <View style={styles.bannerBG}/>
                    <View style={{paddingTop: 0, paddingHorizontal: 16}}>
                        <Image source={require('../assets/banner.png')} style={{height: 164, width:'100%', borderRadius:8}} />
                    </View>

                    <View style={styles.list}>
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
            </>
        )
    }
}
 
const styles = StyleSheet.create({
    header: {
        width: '100%', 
        backgroundColor: '#6CC8BE', 
        justifyContent: 'center', 
        alignItems: 'center', 
        flexDirection: 'row', 
        paddingHorizontal: 16, 
        paddingVertical: 16
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        width: 300,
        marginTop: 16,
    },
    searchBar: {
        width: 300,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        paddingHorizontal: 16,
        borderRadius: 50,
        marginRight: 5
    },
    bannerBG: {
        width: '100%', 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0,
        height: 118, 
        backgroundColor: '#6CC8BE'
    },
    cartButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    GridViewBlockStyle: {
        alignItems: 'flex-start',
        width: 164,
        minHeight: 264,
        marginBottom: 24,
        backgroundColor: '#fff',
        borderRadius: 8
    },
    GridViewInsideTextItemStyle: {
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        margin: 3.5,
    },
    badge: {
        position: 'absolute', 
        width: 16, 
        height: 16, 
        borderRadius: 16/2, 
        backgroundColor: 'red', 
        top: -5, 
        right: -5, 
        zIndex: 999, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    list: {
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        paddingHorizontal: 16, 
        paddingTop: 20, 
        justifyContent: 'space-between'
    },
});

function mapStateToProps({list}) {
    const {listProduct} = list;

    return {listProduct};
}

export default connect( mapStateToProps, { action_getProductList } )(HomeScreen);