import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const PostItem = (props) => {
  return (
    <TouchableOpacity onPress={props.onViewDetail}>
      <View>
        <View style={styles.container}>
          {props.imageUrl ? (
            <Image style={styles.image} source={{ uri: props.imageUrl }} />
          ) : null}
          <View style={styles.wrapper}>
            <View>
              <Text style={styles.topic}>Blog</Text>
            </View>
            <View>
              <Text
                numberOfLines={2}
                onPress={props.onViewDetail}
                style={styles.headline}
              >
                {props.title}
              </Text>
              <Text numberOfLines={4} style={styles.description}>
                {props.body}
              </Text>
            </View>
            <View>
              <View style={styles.detailsWrapper}>
                <Text style={styles.date}>{props.date}</Text>
                <View style={styles.detailsWrapper}>
                  <Text style={styles.likes}>
                    <Ionicons
                      name="thumbs-up-sharp"
                      size={14}
                      color="#5050A5"
                    />{" "}
                    {props.likes}
                  </Text>
                  <Text style={styles.comments}>
                    <Ionicons
                      name="chatbox-ellipses-sharp"
                      size={14}
                      color="#5050A5"
                    />{" "}
                    {props.comments}
                  </Text>
                </View>
              </View>
              <View style={styles.hr}></View>
              <View style={styles.wrapperBottom}>
                <Image
                  style={styles.imgSmall}
                  source={{ uri: props.authorImageUrl }}
                />
                <Text style={styles.author}>{props.authorName}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    backgroundColor: "#FFFFFF",
    display: "flex",
    justifyContent: "space-between",
    borderRadius: 5,
    shadowColor: "#AAAAAA29",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 100,
    shadowRadius: 6,
    elevation: 6,
  },
  wrapper: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  headline: {
    fontSize: 26,
    color: "#333333",
    marginBottom: 5,
    fontFamily: "Teko_700Bold",
  },
  description: {
    fontSize: 16,
    color: "#333333",
    overflow: "hidden",
    fontFamily: "OpenSans_400Regular",
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
    marginTop: 10,
    marginBottom: 10,
  },
  imgSmall: {
    width: 30,
    height: 30,
    borderRadius: 5,
    marginRight: 10,
  },
  wrapperBottom: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  detailsWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    marginTop: 10,
    alignItems: "center",
  },
  date: {
    color: "#AAAAAA",
    fontSize: 14,
  },
  comments: {
    color: "#5050A5",
    fontFamily: "OpenSans_700Bold",
    fontSize: 14,
  },
  likes: {
    marginRight: 20,
    color: "#5050A5",
    fontFamily: "OpenSans_700Bold",
    fontSize: 14,
  },
});

export default PostItem;
