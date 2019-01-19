import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { View, Text, Image, FlatList } from 'react-native';
// import { Button, Card, Divider } from 'react-native-elements';
// import _ from 'lodash';

import { sendPijn, postsFetch } from '../actions';
// import { CardBanner, ListActionButton } from '../components/common';
import PostList from '../components/post/PostList';

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Pijns',
  };

  render() {
    return (
      <PostList />
    );
  }
}
//   componentWillMount() {
//     this.props.postsFetch();
//   }
//
//   renderHeader = () => {
//     return (
//       <View style={styles.writePostView}>
//         <Button
//           title="Write a post!"
//           onPress={() => this.props.navigation.navigate('PostCreate')}
//           backgroundColor="rgba(0,125,255,1)"
//           borderRadius={20}
//           icon={{ name: 'create' }}
//         />
//       </View>
//     );
//   }
//
//   renderRow = ({ author, content, postId }) => {
//     const {
//       containerStyle,
//       dividerStyle,
//       actionsViewStyle,
//       loveNoteIconStyle,
//       pijnsCountStyle
//     } = styles;
//     const currentDate = new Date(
//       new Date().getFullYear(), new Date().getMonth(), new Date().getDate()
//     );
//
//     return (
//       <View>
//         <Card containerStyle={containerStyle}>
//           <CardBanner author={author} />
//           <Text>{content}</Text>
//           <View style={pijnsCountStyle}>
//             <Image
//               source={require('../assets/images/love-note.png')}
//               style={loveNoteIconStyle}
//             />
//             <Text>123 notes</Text>
//           </View>
//           <Divider style={dividerStyle} />
//           <View style={actionsViewStyle}>
//             <ListActionButton
//               imageSource={require('../assets/images/pijn.png')}
//               iconStyle={{ width: 27 }}
//               onPress={() => sendPijn({ postId, author, currentDate })}
//             />
//             <ListActionButton
//               imageSource={require('../assets/images/comment.png')}
//             />
//             <ListActionButton
//               imageSource={require('../assets/images/message.png')}
//             />
//           </View>
//         </Card>
//       </View>
//     );
//   }
//
//   // disabled={lastPijnDate === currentDate}
//   render() {
//     console.log(this.props);
//     const { masterContainerStyle } = styles;
//     const { posts } = this.props;
//     return (
//       <View style={masterContainerStyle}>
//         <FlatList
//           data={posts}
//           renderItem={({ item }) => this.renderRow(item)}
//           ListHeaderComponent={this.renderHeader}
//           keyExtractor={({ item }, postId) => postId.toString()}
//         />
//       </View>
//     );
//   }
// }
//
// const styles = {
//   masterContainerStyle: {
//     flex: 1,
//     backgroundColor: '#cef0ff'
//   },
//   writePostView: {
//     paddingTop: 13,
//   },
//   containerStyle: {
//     marginLeft: 0,
//     marginRight: 0,
//     padding: 10,
//     backgroundColor: 'white'
//   },
//   dividerStyle: {
//     backgroundColor: '#D3D3D3',
//     marginTop: 10,
//     marginBottom: 10
//   },
//   actionsViewStyle: {
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingLeft: 60,
//     paddingRight: 60
//   },
//   pijnsCountStyle: {
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 10
//   },
//   loveNoteIconStyle: {
//     width: 23,
//     height: 23,
//     marginRight: 5
//   }
// };
//
// // const sendPijn = (postId, author) => {
// //   actions.sendPijn(postId, author);
// // };
//
// const pijnSentToday = (lastPijnDate) => {
//   const currentDate = new Date(
//     new Date().getFullYear(), new Date().getMonth(), new Date().getDate()
//   );
//   return (lastPijnDate < currentDate);
// };
//
// function mapStateToProps(state) {
//   console.log('mapping state to props of postList');
//   const posts = _.map(state.posts, (val, uid) => {
//   return { ...val, postId: uid, sendPijn, pijnSentToday };
//   });
//   return { posts, state };
// }

export default connect(null, { sendPijn, postsFetch })(HomeScreen);
