import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Button,
  TextInput,
  TouchableHighlight,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import Ionicons from "react-native-vector-icons";

import Comment from "../components/Comment";
import Colors from "../constants/Colors";
import * as postActions from "../store/actions/post.actions";
import { likeComment } from "../store/actions/post.actions";

const SinglePostScreen = (props: any) => {
  const [inputText, setInputText] = useState("Add a comment");
  const [isFocused, setIsFocused] = useState(false);
  const postId = props.route.params.postId;
  console.log("post ID " + postId);
  const userId = useSelector((state: any) => state.user.loggedInUser);
  const selectedPost = useSelector((state: any) =>
    state.posts.posts.find((post: any) => post.id === postId)
  );
  const dispatch = useDispatch();

  const submitNewComment = () => {
    const date = new Date();
    const newComment = {
      id: new Date().getTime().toString(),
      authorId: userId,
      authorImageUrl: "https://randomuser.me/api/portraits/women/7.jpg",
      body: inputText,
      date: date.toISOString(),
      likes: [],
    };
    dispatch(postActions.addComment(newComment, postId));
    setInputText("Add a comment");
    setIsFocused(false);
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView>
        {selectedPost.imageUrl ? (
          <Image style={styles.image} source={{ uri: selectedPost.imageUrl }} />
        ) : null}
        <View style={styles.container}>
          <Text style={styles.headline}>{selectedPost.title}</Text>
          <View style={styles.wrapperAuthor}>
            <Image
              style={styles.imgSmall}
              source={{ uri: selectedPost.authorImageUrl }}
            />
            <Text style={styles.author}>{selectedPost.authorName}</Text>
          </View>
          <View style={styles.detailsWrapper}>
            <Text style={styles.date}>{selectedPost.readableDate}</Text>
            <View style={styles.detailsWrapper}>
              <Text style={styles.likes}>
                {/*                 <Ionicons name="thumbs-up-sharp" size={14} color="#5050A5" />{" "}
                 */}{" "}
                {selectedPost.likes.length}
              </Text>
              <Text style={styles.comments}>
                {/*                 <Ionicons
                  name="chatbox-ellipses-sharp"
                  size={14}
                  color="#5050A5"
                />{" "} */}
                {selectedPost.comments.length}
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.body}>{selectedPost.body}</Text>
          </View>
          <View style={styles.hr}></View>
          <View style={styles.detailsWrapper}>
            <Text style={styles.likesBig}>
              {selectedPost.likes.length} liked this
            </Text>
            <View>
              {/*               <Ionicons name="thumbs-up-sharp" size={16} color="#5050A5" />
              <Button
                title="Like"
                color="#5050A5"
                //style={styles.likeBtn}
                //onPress={likePost(userId, , )}
              /> */}
            </View>
          </View>
        </View>

{/*         <FlatList
          data={selectedPost.comments.filter((comment: any) => comment != null)}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <Comment
              commentId={itemData.item.id}
              authorId={itemData.item.authorId}
              authorName={itemData.item.authorName}
              authorImageUrl={itemData.item.authorImageUrl}
              body={itemData.item.body}
              date={itemData.item.date}
              likes={
                itemData.item.likes == undefined
                  ? 0
                  : itemData.item.likes.length
              }
              liked={
                itemData.item.likes != undefined &&
                itemData.item.likes.includes(userId)
              }
              userId={userId}
              postId={postId}
            />
          )}
        /> */}
        <View style={styles.inputView}>
          <Image
            style={styles.inputImage}
            source={{ uri: "https://randomuser.me/api/portraits/women/2.jpg" }}
          />
          <TextInput
            style={styles.input}
            onFocus={() => {
              setInputText("");
              setIsFocused(true);
            }}
            onBlur={() => {
              // setInputText("Add a comment");
            }}
            onChangeText={(text) => {
              setInputText(text);
            }}
            value={inputText}
          />
          {isFocused && (
            <View style={styles.buttonView}>
              <TouchableHighlight onPress={submitNewComment}>
                {
                  <Text> submit </Text>
                  /*               <Ionicons
                  style={styles.buttonElement}
                  name="chatbox-ellipses"
                  size={22}
                  color="#fff"
                /> */
                }
              </TouchableHighlight>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#FFF",
  },
  container: {
    padding: 20,
    display: "flex",
    justifyContent: "space-between",
  },
  detailsWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 10,
    alignItems: "center",
  },
  date: {
    color: Colors.grayText,
    fontSize: 14,
  },
  comments: {
    color: "#5050A5",
    fontSize: 14,
  },
  likes: {
    marginRight: 20,
    color: "#5050A5",
    fontSize: 14,
  },
  likesBig: {
    fontSize: 16,
    color: "#32305D",
  },
  image: {
    width: "100%",
    height: 215,
  },
  headline: {
    fontSize: 26,
    color: "#333333",
  },
  body: {
    fontSize: 16,
    color: "#333333",
    lineHeight: 22,
  },
  topic: {
    color: "#5050A5",
    textTransform: "uppercase",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  author: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  hr: {
    borderTopColor: "#EEEEEE",
    borderTopWidth: 1,
    marginTop: 30,
    marginBottom: 20,
  },
  imgSmall: {
    width: 30,
    height: 30,
    borderRadius: 5,
    marginRight: 10,
  },
  wrapperAuthor: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 5,
  },
  interaction: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    fontWeight: "bold",
  },
  likeBtn: {
    color: "#5050A5",
    borderColor: "#5050A5",
    borderRadius: 5,
    borderWidth: 1,
    paddingLeft: 30,
    paddingRight: 30,
    fontSize: 16,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  button: {},
  inputView: {
    flexDirection: "row",
    marginTop: 20,
    backgroundColor: Colors.background,
    padding: 20,
    alignItems: "center",
    borderTopColor: Colors.backgroundHighlight,
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: Colors.backgroundHighlight,
    marginLeft: 10,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  buttonView: {
    backgroundColor: Colors.highlight,
    padding: 9,
    borderRadius: 5,
  },
  buttonElement: {
    color: "#fff",
  },
  inputImage: {
    marginTop: -5,
    width: 40,
    height: 40,
    borderRadius: 100,
  },
});

export default SinglePostScreen;
