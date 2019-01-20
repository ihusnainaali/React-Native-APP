import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import _ from 'lodash';

import { sendPijn, postsFetch } from '../../actions';
import PostListItem from './PostListItem';

class PostList extends Component {
  componentWillMount() {
    this.props.postsFetch();
  }

  renderRow = (post) => {
    return (
      <PostListItem post={post} />
    );
  }

  renderHeader = () => {
    AsyncStorage.setItem('pijn_log', JSON.stringify({}));

    return (
      <View style={styles.writePostView}>
        <Button
          title="Write a post!"
          onPress={() => this.props.redirect('PostCreate')}
          backgroundColor="rgba(0,125,255,1)"
          borderRadius={20}
          icon={{ name: 'create' }}
        />
      </View>
    );
  }

  render() {
    const { posts } = this.props;

    return (
      <View style={styles.masterContainerStyle}>
        <FlatList
          data={posts}
          renderItem={({ item }) => this.renderRow(item)}
          ListHeaderComponent={this.renderHeader}
          keyExtractor={({ item }, postId) => postId.toString()}
        />
      </View>
    );
  }
}

const styles = {
  masterContainerStyle: {
    flex: 1,
    backgroundColor: '#cef0ff',
  },
  writePostView: {
    paddingTop: 13
  }
};

const pijnSentToday = (lastPijnDate) => {
  const currentDate = new Date(
    new Date().getFullYear(), new Date().getMonth(), new Date().getDate()
  );
  return (lastPijnDate < currentDate);
};

function mapStateToProps(state) {
  console.log('post list ms2p', state);
  const posts = _.map(state.posts, (val, uid) => {
    return { ...val, postId: uid, sendPijn, pijnSentToday };
  });
  return { posts, state };
}

export default connect(mapStateToProps, { sendPijn, postsFetch })(PostList);
