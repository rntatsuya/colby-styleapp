import React, { Component, PropTypes } from 'react';
import {
  View,
  Animated,
  Easing,
  Text,
  StyleSheet,
  WebView,
  ScrollView,
  Dimensions,
  ListView,
  TouchableHighlight,
  Navigator
} from 'react-native';
import _ from 'lodash';

import SearchBar from './search_bar';
import Explanation from './explanation';
import TitleList from './title_list';
import NavigationBar from './navBar';
import Spinner from './activity_indicator';

const { height, width } = Dimensions.get('window');
const WEBVIEW_REF = 'webview';

export default class extends Component {

  constructor(props) {
    super(props);

    this.state = {
      initialPage:true
    };
  }

  renderScene = (route, navigator) => {
    _navigator = navigator;
    switch (route.id) {
      case 'Main':
        return (
          <Main
            navigator={navigator}
            title="Main"/>
        );
        case 'Description':
          return (
            <Description
              navigator={navigator}
              title="Description"
              selectedText={route.selectedText}
              selectedTitle={route.selectedTitle}/>
          );
    }
  }

  handleScreenSwitch = (navigator) => {
    navigator.pop();
//    console.log(this.state.initialPage);
    this.setState = {
      initialPage: true
    };
//    console.log(this.state.initialPage);
  }

  render() {
    return (
      <Navigator
        style={{flex:1}}
        initialRoute={{id: 'Main'}}
        renderScene={this.renderScene}
      />
    );
  }
}


class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      term:'',
      titles:[],
      texts:[],
      loading:true,
      viewOpacity: new Animated.Value(0)
    };

    this.runAnimations = runAnimations.bind(this);
    this.initUpdate(); // loads the title list when opening the app
  }

  initUpdate = () => {
    const initKey = " "
    Explanation(initKey)
      .then((data) => {
      //  console.log(data);
        this.setState(data);
        console.log(this.state);
      });

    this.runAnimations();
  }

  termSearch = (keyword) => {
    this.setState({
      term: keyword,
      loading: true
    });
    //console.log(keyword);

    Explanation(keyword)
      .then((data) => {
      //  console.log(data);
        this.setState(data);
        console.log(this.state);
      });
  }

  titleSelect = (selectedTitle) => {
    this.setState({
      title: selectedTitle
    });
    this.navNext(selectedTitle);

  }

  navNext = (selectedTitle) => {
    // probably not the best way to do this
    // because there's an assumption that the title index is
    // matching with related text
    for (i = 0; i < this.state.titles.length; i++) {
      if (selectedTitle===this.state.titles[i]) {
        this.props.navigator.push({
          id: 'Description',
          selectedTitle: this.state.titles[i],
          selectedText: this.state.texts[i]
        });
      }
    }
  }


  render() {
    const termSearch = _.debounce((term) => {this.termSearch(term)},120);
    return (
      <Animated.View style={{
        flex: 0, // makes the flexbox inflexible
        justifyContent: 'flex-start', // brings spinning wheel to a visible position
        alignItems: 'center', // changes x-position
        maxHeight: height,
        opacity: this.state.viewOpacity
      }}>
        <View style={styles.search_area}>
          <SearchBar
            onSearchTermChange={termSearch}
          />
        </View>
        <ScrollView
          contentContainerStyle={styles.text_area}
        >
          <TitleList
            titles={this.state.titles}
            onSelectTitle={this.titleSelect}
            loading={this.state.loading}
          />
        </ScrollView>
      </Animated.View>
    );
  }
}

class Description extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title:this.props.selectedTitle,
      text:this.props.selectedText,
      animating: false
    };
  }

  closeActivityIndicator = () => {
      setTimeout(() => {
         this.setState({animating: false});
      }, 0);
   }

  componentDidMount() {
    this.closeActivityIndicator();
  }

  render() {
    const titleConfig = {
      title: this.state.title,
    };
    const backButtonConfig = {
      title: "Back",
      handler: () => this.props.navigator.pop(),
      style: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'green'
      }
    };

    return (
      <View style={styles.container}>
        <View style={{backgroundColor:'#788bbb'}}>
          <View style={styles.header}>
            <View style={{flexDirection:'row'}}>
            <TouchableHighlight
              onPress={() => this.props.navigator.pop()}
              underlayColor="#8AACB8"
            >
              <Text style={styles.backArrow}> ◀︎ Back to Search</Text>
            </TouchableHighlight>
            <Text style={{flex:1}}></Text>
            </View>
            <View style={{flex:0, justifyContent:'center'}}>

            <Text style={styles.title}>
              {this.state.title}
            </Text>
            </View>
          </View>
        </View>
        <WebView
         ref={WEBVIEW_REF}
         source={{html: this.state.text}}
         style={styles.description}
        />
      </View>
    );
  }
}

function runAnimations() {
  Animated.timing(this.state.viewOpacity,
    {
      toValue:1,
      duration:1000,
      easing: Easing.easeOutBack
    }).start();
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  search_area: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#788bbb',
    borderBottomWidth: 1,
    borderColor: 'black'
  },
  title: {
    flex: 0,
    alignItems:'center',
    justifyContent:'center',
    fontFamily: 'Helvetica'
  },
  backArrow: {
    flex:1,
    fontSize:12,
    fontFamily: 'Helvetica'
  },
  header: {
    flex:0,
    alignItems:'center',
    justifyContent:'center',
    marginTop:20,
    backgroundColor:'#788bbb',
    height:60,
    width:width,
    borderBottomWidth:1
  },
  text_area: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  list: {
    flex: 1,
    height: 40,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  description: {
    flex: 4,
    minHeight: height-100,
    minWidth: width,
    borderWidth: 1,
    borderColor: 'red',
  },
  list_text: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBar: {
    flex: 1,
    backgroundColor: '#788bbb',
    borderWidth: 2,
    borderColor: 'black',
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
