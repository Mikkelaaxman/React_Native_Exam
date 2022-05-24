import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Button, Image, TouchableHighlight, ProgressViewIOSComponent } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import * as postsActions from "../store/actions/post.actions";

import Colors from "../constants/Colors";

const Comment = (props:any) => {
    const [isLiked, setIsLiked] = useState(props.liked);
    const dispatch = useDispatch();
    const date = new Date(props.date);
    const readableDate = date.toLocaleDateString("en-EN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    const handleLikeComment = () => {
        // if user doesn't like to comment already
        if (props.liked) {
            console.log("disliking");
            dispatch(postsActions.dislikeComment(props.userId, props.commentId, props.postId));
        } else {
            console.log("liking");
            dispatch(postsActions.likeComment(props.userId, props.commentId, props.postId));
            props.liked = true;
        }
        console.log(isLiked);
        setIsLiked((currentIsLiked: any) => !currentIsLiked);
        console.log(isLiked);
    };

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: props.authorImageUrl }} />
            <View style={styles.main}>
                <Text style={styles.name}>{props.authorName}</Text>
                <Text style={styles.body}>{props.body}</Text>
                <View style={styles.footer}>
                    <Text style={styles.date}>{readableDate}</Text>
                    {props.likes > 0 ? <Text style={styles.likes}>{props.likes} likes</Text> : null}
                    {props.authorId == props.userId ? <Text style={styles.likes}>delete</Text> : null}
                </View>
            </View>
            <TouchableHighlight onPress={handleLikeComment} style={isLiked ? styles.liked : styles.like}>
                <Ionicons style={styles.icon} name="thumbs-up-outline" />
            </TouchableHighlight>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 20,
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 50,
    },
    main: {
        flex: 1,
        marginHorizontal: 20,
    },
    name: {
        fontWeight: "bold",
    },
    body: {},
    footer: {
        flexDirection: "row",
        marginTop: 10,
    },
    date: {
        color: Colors.grayText,
        marginRight: 10,
    },
    likes: {
        fontWeight: "bold",
        color: Colors.grayText,
        marginRight: 10,
    },
    like: {
        width: 25,
        height: 25,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: Colors.grayText,
        justifyContent: "center",
        alignItems: "center",
    },
    liked: {
        width: 25,
        height: 25,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: Colors.grayText,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.highlight,
    },
    icon: {
        //size: 12,
        color: Colors.grayText
    },
});

export default Comment;