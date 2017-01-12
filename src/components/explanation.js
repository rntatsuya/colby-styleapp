// get info from json using Colby Style Rest API
// take in keyword variable from SearchBar
// IMPORTANT
// use https instead of http because ios doesn't support
// http requests on default
// source : http://stackoverflow.com/questions/38418998/react-native-fetch-network-request-failed
import React from 'react';
const rootURL = 'https://www.colby.edu/communicationsoffice/wp-json/colby-style/v0/style-posts';

const Explanation = (keyword) => {
  let url = `${rootURL}?s=${keyword}`;
  let data = { titles: [], texts: [], loading: true};
  console.log(url);

  return fetch(url)
    .then(function(response){
      return response.json()
    })
    .then(function(json){
      // initialize temporal list to
      // store titles and texts arrays in an object
      var list = [];
      for (var i = 0; i < json.length; i++) {
        list.push({'title':json[i].post_title, 'text':json[i].post_content});
      }
      // comparasion function
      // this is where the ordering logic takes place
      list.sort(function(a,b) {
        return ((a.title < b.title) ? -1 : ((a.title == b.title) ? 0 : 1));
      });
      // regroup them into their own arrays so that
      // the title and text match
      for (var i = 0; i < list.length; i++) {
        data.titles[i] = list[i].title;
        data.texts[i] = list[i].text;
      }
      //console.log(data);


      // set loading to false ////////////////////////////
      data.loading = false;
      return data;
    }).catch(function() { //if promise is rejected, return default error text
      return {
        text: "Invalid keyword. Try typing in something else."
      }
    });
}

export default Explanation;
