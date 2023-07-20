import {
  Text,
  View,
  Image,
  Pressable,
  FlatList,
  Keyboard,
  Modal,
  RefreshControl,
  Linking,
  ActivityIndicator,
  ScrollView,
  DeviceEventEmitter,
  Dimensions,
  Platform,
} from "react-native";
import React, { createRef, useCallback, useEffect } from "react";
import AppSafeAreaView from "../../../../component/AppSafeAreaView";
import AppStatusBar from "../../../../component/AppStatusBar";
import { Colors } from "../../../../theme/colors";
import styles from "./style";
import {
  BlogIcon,
  CountriesLogoIcon,
  MyCartCancelIcon,
  NextIcon,
  PreviousIcon,
  SearchBarIcon,
  VideoIcon,
} from "../../../../theme/svgimages";
import { TextInput } from "react-native-gesture-handler";
import { ScreenText } from "../../../../theme/screentext";
import { Images } from "../../../../theme/images";
import ImageSlider from "../../../../component/IntroductionSlider/imageSlider";
import CustomGradientButton from "../../../../component/GradientButton";
import { useState } from "react";
import TestimonialsSlider from "../../../../component/IntroductionSlider/TestimonialsSlider";
import CustomTextInput, {
  CustomMessageTextInput,
} from "../../../../component/CustomTextInput";
import commonStyles from "../../../../theme/commonStyle";
import ErrorText from "../../../../component/ErrorText";
import { useNavigation, useScrollToTop } from "@react-navigation/native";
import { APP_CONSTANT } from "../../../../utils/appConstant";
import {
  isConnectionAvailable,
  showToast,
} from "../../../../utils/commonFunction";
import API_CONFIG from "../../../../api/api_url";
import Loader from "../../../../component/ProgressBar";
import { callApi } from "../../../../api";
import YoutubePlayer from "react-native-youtube-iframe";
import { NAVIGATION } from "../../../../navigation/index";
import { Constant } from "../../../../theme/constant";
import { ClearAsync } from "../../../../utils/ClearAsync";
import { print_data } from "../../../../utils/Logs";
import ReadMore from "@fawazahmed/react-native-read-more";
import ImageLoad from "../../../../component/ImageLoad/index";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { AirbnbRating } from "react-native-ratings";
import _ from "underscore";
import RenderHTML from "react-native-render-html";
import { Dimens } from "../../../../theme/dimens";
import { Fonts } from "../../../../theme/fonts";
import { useDispatch } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const userEmailRef = createRef();
  const userNameRef = createRef();
  const userMessageRef = createRef();

  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [isVideoLoading, setVideoLoading] = useState(false);

  const [isShowNameError, showNameError] = useState(false);
  const [isShowEmailError, showEmailError] = useState(false);
  const [isShowMessageError, showMessageError] = useState(false);

  const [nameErrorText, setNameErrorText] = useState("");
  const [emailErrorText, setEmailErrorText] = useState("");
  const [messageErrorText, setMessageErrorText] = useState("");
  const [isLoadervisible, setIsLoaderVisible] = useState(false);
  const [collapsed, setCollapsed] = React.useState(true);

  const [textShown, setTextShown] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);

  const [sliderImage, setSliderImage] = useState([]);
  const [categoriesData, setcategoriesData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [sendData, setSendData] = useState("");
  const [sendVisible, setSendVisible] = useState(false);
  const [contactData, setContactData] = useState("");
  const [sliderPage, setSliderPage] = useState(0);
  const [serchLayoutVisible, setSerchLayoutVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [expand, setExpand] = useState(false);

  const height = (Constant.windowHeight / 25) * 9;

  const colors = ["#E6ECE1", "#F7F2EE", "#E0FFFF", "#E3E4FA"];
  let filterData = Object.values(filteredDataSource);
  let filterData1 = _.uniq(filterData, "categoriesName");
  const ref = React.useRef(null);
  var layoutHeight = 0;

  const onTextLayout = useCallback((e) => {
    setLengthMore(e.nativeEvent.lines.length >= 4);
  }, []);

  const toggleNumberOfLines = () => {
    setTextShown(!textShown);
  };

  useScrollToTop(ref);

  useEffect(() => {
    setIsLoaderVisible(true);
    callGetSliderAPi();
    callAllCategoriesListAPi();
    callTestimonialSliderAPi();
    calLGlobalSearchAPi(search);
  }, []);

  useEffect(() => {
    DeviceEventEmitter.addListener(Constant.SCROLL_EVENT, (e) => {
      setTextShown(false);
      setTimeout(() => {
        print_data(textShown);
        ref.current?.scrollTo({ y: 460 });
      }, 100);
    });

    return () => {
      DeviceEventEmitter.removeListener(Constant.SCROLL_EVENT);
    };
  }, []);

  const onLayout = (event) => {
    const { x, y, height, width } = event.nativeEvent.layout;
    // print_data("==============height===1" + height);
    layoutHeight = height;

    print_data("==============layoutHeight==2=" + layoutHeight);
  };

  const BoldText = (props) => {
    return (
      <Text
        style={{
          fontFamily: Fonts.Bold,
        }}
      >
        {props.children}
      </Text>
    );
  };

  const TopicView = (props) => {
    return <Text style={styles.topicTextStyle}>{props.children}</Text>;
  };
  const onProductDataPress = (item) => {
    navigation.navigate(NAVIGATION.CHAPTER, {
      categoriesId: item?.productData?.myslug,
      mainCategoryId: item?.productData?.myslug,
      categoriesName: item?.productData?.myslug,
    });
  };
  const onCategories3Data = (item) => {
    navigation.navigate(NAVIGATION.CHAPTER, {
      categoriesId: item?.categories3Data?.myslug,
      mainCategoryId: item?.categories3Data?.myslug,
      categoriesName: item?.categories3Data?.myslug,
    });
  };
  const onCancelPressIcon = () => {
    setSearch("");
    setSerchLayoutVisible(false);
  };

  const clearData = () => {
    setSearch("");
  };

  const onRefresh = (bgColorData) => {
    setRefreshing(true);
    callGetSliderAPi();
    callAllCategoriesListAPi(bgColorData);
    callTestimonialSliderAPi();
    calLGlobalSearchAPi(search);
  };

  const renderCategoryItem = ({ item, index }) => {
    const systemFonts = ["Montserrat-Regular", "Montserrat-Bold"];
    const source = {
      html: item?.description,
    };

    return (
      <Pressable
        onPress={() => onCategoriesPress(item)}
        style={[
          styles.categoryContainerStyle,
          {
            backgroundColor: colors[index % colors.length],
          },
        ]}
      >
        <ImageLoad
          style={styles.categoryIconStyle}
          source={
            item?.imageThumb != null && item?.imageThumb.length != 0
              ? item?.imageThumb
              : ""
          }
        />
        <Text style={styles.categoryTitleTextStyle}>{item?.name}</Text>
        <RenderHTML
          contentWidth={Dimensions.get("window").width}
          tagsStyles={{
            p: {
              color: Colors.DescriptionColor,
              fontFamily: "Montserrat-Regular",
              fontSize: Dimens.dimen_14,
              lineHeight: Dimens.dimen_16,
              marginTop: Dimens.dimen_7,
            },
          }}
          source={source}
          systemFonts={systemFonts}
        />
      </Pressable>
    );
  };

  const renderImageItem = (item) => {
    return (
      <View style={styles.testinalsContainerstyle}>
        <View style={styles.centerView}>
          {item?.item?.image != null && item?.item?.image?.length != 0 ? (
            <ImageLoad
              style={styles.testimonialsImageStyle}
              source={item?.item?.image}
            />
          ) : (
            <Image
              style={styles.testimonialsImageStyle}
              source={Images.testimonialProfileImg}
            />
          )}

          <Text style={styles.testimonialsDrTextStyle}>{item?.item?.name}</Text>
          <AirbnbRating
            showRating={false}
            starContainerStyle={styles.starContainerStyle}
            selectedColor={Colors.ThemeColor}
            defaultRating={item?.item?.ratting}
            revi
            size={18}
          />
          <ScrollView
            nestedScrollEnabled={true}
            contentContainerStyle={styles.scrollViewReadMoreStyle}
            overScrollMode={"never"}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={"handled"}
          >
            <ReadMore
              numberOfLines={7}
              style={styles.testimonialtextStyle}
              seeMoreText={ScreenText.READ_MORE}
              seeLessText={ScreenText.READ_LESS}
              seeMoreStyle={styles.readLessTextStyle}
              seeLessStyle={styles.readLessTextStyle}
            >
              {item.item?.content}
            </ReadMore>
          </ScrollView>
        </View>
      </View>
    );
  };
  const renderNextButton = () => {
    return (
      <View>
        <NextIcon
          style={styles.nextIconStyle}
          color={Colors.gray}
          opacity={currentIndex === sliderPage.length - 1 ? 0.3 : 1}
        />
      </View>
    );
  };
  const renderPreButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <PreviousIcon
          style={styles.nextIconStyle}
          color={Colors.gray}
          opacity={currentIndex === 0 ? 0.3 : 1}
        />
      </View>
    );
  };
  const onSliderButtonPress = (item) => {
    print_data(item.item.link);
    let sliderData = item.item.link.split("/").slice(-1).toString();

    print_data(sliderData);
    if (sliderData === ScreenText.EDIC_OTHER_EXAMS) {
      navigation.navigate(NAVIGATION.CATEGARIES, {
        categoriesId: sliderData,
      });
    } else if (sliderData === ScreenText.ORIENTATION) {
      navigation.navigate(NAVIGATION.CATEGARIES, {
        categoriesId: sliderData,
      });
    } else if (sliderData === ScreenText.THE_ANTHAESTHETIC_PRIMARY) {
      navigation.navigate(NAVIGATION.CHAPTER, {
        categoriesId: sliderData,
        mainCategoryId: sliderData,
        categoriesName: sliderData,
      });
    } else if (sliderData === ScreenText.LEARN_X) {
      navigation.navigate(NAVIGATION.CATEGARIES, {
        categoriesId: sliderData,
      });
    } else {
      navigation.navigate(NAVIGATION.SAMPLE_TEST);
    }
  };
  const onCategoriesPress = (item) => {
    print_data(item?.myslug);
    navigation.navigate(NAVIGATION.CATEGARIES, {
      categoriesId: item?.myslug,
    });
  };

  const onwatsapp = () => {
    Linking.openURL(Constant.WHATSAPP_LINK);
  };

  const onBlogPress = () => {
    navigation.navigate(NAVIGATION.BLOG_SCREEN);
  };
  const onSmpleTestPress = () => {
    navigation.navigate(NAVIGATION.SAMPLE_TEST);
  };
  const onHowItWorkPress = () => {
    setVisible(true);
    setVideoLoading(true);
  };

  const searchFilterFunction = (text, categoriesData) => {
    const newData = categoriesData.filter(function (item) {
      const itemData = item.categoriesName
        ? item.categoriesName.toUpperCase()
        : "".toUpperCase();

      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setFilteredDataSource(newData);
  };
  const ItemView = ({ item }) => {
    return (
      <>
        <Pressable
          style={styles.searchContainerView}
          onPress={() => {
            if (item?.categoryData) {
              oncategiresDataPress(item);
            } else if (item?.categories2Data) {
              onSerchDataPress(item);
            } else if (item?.categories3Data) {
              onCategories3Data(item);
            } else if (item?.productData) {
              onProductDataPress(item);
            }
          }}
        >
          <View style={styles.indexArrow} />
          <Text style={styles.searchTitle}>{item?.categoriesName}</Text>
        </Pressable>
      </>
    );
  };

  const onSerchDataPress = (item) => {
    navigation.navigate(NAVIGATION.CHAPTER, {
      categoriesId: item?.categories2Data?.myslug,
      mainCategoryId: item?.categories2Data?.myslug,
      categoriesName: item?.categories2Data?.myslug,
    });
  };
  const oncategiresDataPress = (item) => {
    navigation.navigate(NAVIGATION.CATEGARIES, {
      categoriesId: item?.categoryData?.myslug,
    });
  };

  const renderItem = (item) => {
    return (
      <View style={styles.itemContainerStyle}>
        <View style={styles.flexView}>
          <Text style={styles.sliderText} numberOfLines={2}>
            {item?.item?.name}
          </Text>
          <View>
            <View style={styles.sliderButtonStyle}>
              <CustomGradientButton
                gradientColors={[
                  Colors.gradientColor,
                  Colors.gradientColor,
                  Colors.gradientColor2,
                ]}
                numLines={1}
                containerStyle={styles.sliderButtonContainerStyle}
                buttonTextStyle={styles.sliderButtonTextStyle}
                buttonText={item?.item?.button_text}
                onButtonClick={() => onSliderButtonPress(item)}
              />
            </View>
            <Image
              source={Images.sliderGroupIcon}
              style={styles.sliderGroupIcon}
            />
            <View style={styles.countriesView}>
              <CountriesLogoIcon style={styles.logoIcon} />
              <Text style={styles.trustedTitle}>
                {ScreenText.TRUSTED_TITLE}
              </Text>
            </View>
          </View>
        </View>
        <ImageLoad
          source={
            item?.item?.image != null && item?.item?.image?.length != 0
              ? item?.item?.image
              : ""
          }
          style={styles.bannerImageStyle}
          resizeMode={"contain"}
          noImage={Images.appleIcon}
        />
      </View>
    );
  };

  const onSendPress = async () => {
    Keyboard.dismiss();
    let is_validate = true;
    if (await isConnectionAvailable()) {
      if (userName?.length == 0) {
        is_validate = false;
        showNameError(true);
        setNameErrorText(ScreenText.EMPTY_ERROR);
      }
      if (userEmail?.length == 0) {
        is_validate = false;
        showEmailError(true);
        setEmailErrorText(ScreenText.EMPTY_ERROR);
      } else if (!APP_CONSTANT.EMAIL_PATTERN.test(userEmail)) {
        is_validate = false;
        showEmailError(true);
        setEmailErrorText(ScreenText.EMAIL_NOT_VALID_ERROR);
      }
      if (userMessage?.length == 0) {
        is_validate = false;
        showMessageError(true);
        setMessageErrorText(ScreenText.EMPTY_ERROR);
      }
      if (is_validate) {
        setIsLoaderVisible(true);
        callContactUsAPi();
      }
    } else {
      showToast(ScreenText.INTERNET_ERROR);
    }
  };

  const callContactUsAPi = async () => {
    try {
      var param_data = {
        name: userName,
        email: userEmail,
        message: userMessage,
        mobile: "",
        subject: userMessage,
      };
      const response = await callApi(
        API_CONFIG.SEND_CONTACT_US,
        param_data,
        API_CONFIG.POST,
        null
      );
      print_data(response);
      if (response?.body != null) {
        if (
          response?.body?.status === 200 &&
          response?.body?.data?.value == true
        ) {
          let emailData = response?.body?.data?.data;
          callSendEmailAPI(emailData);
        } else {
          setIsLoaderVisible(false);
          if (response?.body?.data?.error?.message) {
            setTimeout(() => {
              showToast(response?.body?.data?.error?.message);
            }, 10);
          } else {
            setTimeout(() => {
              showToast(ScreenText.MY_APP_SOMETHING_WRONG);
            }, 10);
          }
        }
      } else {
        setIsLoaderVisible(false);
        setTimeout(() => {
          showToast(ScreenText.MY_APP_SOMETHING_WRONG);
        }, 10);
      }
    } catch (error) {
      setIsLoaderVisible(false);
      setTimeout(() => {
        showToast(ScreenText.MY_APP_SOMETHING_WRONG);
      }, 10);
      print_data(error + "==========");
    }
  };

  const callSendEmailAPI = async (emailData) => {
    print_data(emailData);
    try {
      var param_data = {
        _id: emailData._id,
      };
      const response = await callApi(
        API_CONFIG.EMAIL_CONTACT_US,
        param_data,
        API_CONFIG.POST,
        null
      );
      print_data(response);
      if (response?.body != null) {
        if (
          response?.body?.status === 200 &&
          response?.body?.data?.value == true
        ) {
          setIsLoaderVisible(false);
          setContactData(response?.body?.data?.value == true);
          setSendData(ScreenText.CONTACT_SEND_SUCCESS);
          setSendVisible(true);
          setUserEmail("");
          setUserName("");
          setUserMessage("");
        } else {
          setIsLoaderVisible(false);
          if (response?.body?.data?.error?.message) {
            setTimeout(() => {
              showToast(response?.body?.data?.error?.message);
            }, 10);
          } else {
            setTimeout(() => {
              showToast(ScreenText.MY_APP_SOMETHING_WRONG);
            }, 10);
          }
        }
      } else {
        setIsLoaderVisible(false);
        setTimeout(() => {
          showToast(ScreenText.MY_APP_SOMETHING_WRONG);
        }, 10);
      }
    } catch (error) {
      setIsLoaderVisible(false);
      setTimeout(() => {
        showToast(ScreenText.MY_APP_SOMETHING_WRONG);
      }, 10);
      print_data(error + "==========");
    }
  };

  const callGetSliderAPi = async () => {
    try {
      const response = await callApi(
        API_CONFIG.GET_SLIDER_DATA,
        null,
        API_CONFIG.POST,
        null
      );
      if (response?.body != null) {
        if (response?.body?.status === 200) {
          setIsLoaderVisible(false);
          setRefreshing(false);
          setSliderImage(response?.body?.data?.data?.results);
        } else if (
          response?.body?.status === APP_CONSTANT.RESPONSE_ERROR_401 ||
          response?.body?.status === APP_CONSTANT.RESPONSE_ERROR_404
        ) {
          setIsLoaderVisible(false);
          setTimeout(() => {
            ClearAsync(true, navigation, dispatch);
          }, 10);
        } else {
          setIsLoaderVisible(false);
          setRefreshing(false);
          setTimeout(() => {
            showToast(ScreenText.MY_APP_SOMETHING_WRONG);
          }, 10);
        }
      } else {
        setIsLoaderVisible(false);
        setRefreshing(false);
        setTimeout(() => {
          showToast(ScreenText.MY_APP_SOMETHING_WRONG);
        }, 10);
      }
    } catch (error) {
      setIsLoaderVisible(false);
      setRefreshing(false);
      setTimeout(() => {
        showToast(ScreenText.MY_APP_SOMETHING_WRONG);
      }, 10);
      print_data(error + "==========");
    }
  };

  const callTestimonialSliderAPi = async () => {
    var param_data = {
      page: sliderPage,
      keyword: "",
    };
    try {
      const response = await callApi(
        API_CONFIG.TESTIMONIAL_SEARCH,
        param_data,
        API_CONFIG.POST,
        null
      );

      if (response?.body != null) {
        if (response?.body?.status === 200) {
          setSliderPage(response?.body?.data?.data?.results);
          setIsLoaderVisible(false);
          setRefreshing(false);
        } else if (
          response?.body?.status === APP_CONSTANT.RESPONSE_ERROR_401 ||
          response?.body?.status === APP_CONSTANT.RESPONSE_ERROR_404
        ) {
          setTimeout(() => {
            ClearAsync(true, navigation, dispatch);
          }, 10);
        } else {
          setIsLoaderVisible(false);
          setRefreshing(false);
          setTimeout(() => {
            showToast(ScreenText.MY_APP_SOMETHING_WRONG);
          }, 10);
        }
      } else {
        setIsLoaderVisible(false);
        setRefreshing(false);
        setTimeout(() => {
          showToast(ScreenText.MY_APP_SOMETHING_WRONG);
        }, 10);
      }
    } catch (error) {
      setIsLoaderVisible(false);
      setRefreshing(false);
      setTimeout(() => {
        showToast(ScreenText.MY_APP_SOMETHING_WRONG);
      }, 10);
      print_data(error + "==========");
    }
  };

  const callAllCategoriesListAPi = async () => {
    try {
      const response = await callApi(
        API_CONFIG.GET_CATEGORY_LIST,
        null,
        API_CONFIG.POST,
        null
      );
      // print_data(response);
      if (response?.body != null) {
        if (
          response?.body?.status === 200 &&
          response?.body?.data?.value == true
        ) {
          let categoriesBgData = response?.body?.data?.data?.results;
          setcategoriesData(categoriesBgData);
        } else {
          setTimeout(() => {
            showToast(ScreenText.MY_APP_SOMETHING_WRONG);
          }, 10);
        }
      }
    } catch (error) {
      print_data(error + "==========");
    }
  };

  const calLGlobalSearchAPi = async (search) => {
    try {
      var param_data = {
        textSearch: "",
      };

      const response = await callApi(
        API_CONFIG.GLOBAL_SEARCH,
        param_data,
        API_CONFIG.POST,
        null
      );
      // print_data(response);
      if (response?.body != null) {
        if (
          response?.body?.status === 200 &&
          response?.body?.data?.value == true
        ) {
          let categoriesNameData = response?.body?.data?.data;
          let categoriesData = [];

          categoriesNameData?.category &&
            categoriesNameData?.category?.map((item, index1) => {
              let categories = {
                categoriesName: item.name,
                categoryData: item,
              };
              categoriesData.push(categories);
            });

          categoriesNameData?.category2 &&
            categoriesNameData?.category2?.map((item, index1) => {
              item?.category &&
                item?.category?.map((item1, index) => {
                  let categories = {
                    categoriesName: item1.name + "-" + item.name,
                    categories2Data: item,
                  };
                  categoriesData.push(categories);
                });
            });

          categoriesNameData?.category3 &&
            categoriesNameData?.category3?.map((item1, index) => {
              item1?.categoryLevel2 &&
                item1?.categoryLevel2?.map((item, index1) => {
                  item?.category &&
                    item?.category?.map((item2, index2) => {
                      let categories = {
                        categoriesName:
                          item2.name + "-" + item?.name + "-" + item1.name,
                        categories3Data: item,
                      };
                      categoriesData.push(categories);
                    });
                });
            });

          categoriesNameData?.product &&
            categoriesNameData?.product?.map((item1, index) => {
              item1?.categoryLevel3 &&
                item1?.categoryLevel3?.map((item2, index1) => {
                  item2?.categoryLevel2 &&
                    item2?.categoryLevel2?.map((item, index2) => {
                      item?.category &&
                        item?.category?.map((item3, index3) => {
                          let categories = {
                            categoriesName: item1?.name,
                            productData: item,
                          };
                          categoriesData.push(categories);
                        });
                    });
                });
            });

          setFilteredDataSource(categoriesData);
          setMasterDataSource(categoriesData);
          setIsLoaderVisible(false);
          setRefreshing(false);
          if (search.length > 0) {
            searchFilterFunction(search, categoriesData);
          }
        } else if (
          response?.body?.status === APP_CONSTANT.RESPONSE_ERROR_401 ||
          response?.body?.status === APP_CONSTANT.RESPONSE_ERROR_404
        ) {
          setRefreshing(false);
          setIsLoaderVisible(false);
          setTimeout(() => {
            ClearAsync(true, navigation, dispatch);
          }, 10);
        } else {
          setIsLoaderVisible(false);
          setRefreshing(false);
        }
      } else {
        setIsLoaderVisible(false);
        setRefreshing(false);
        setTimeout(() => {
          showToast(ScreenText.MY_APP_SOMETHING_WRONG);
        }, 10);
      }
    } catch (error) {
      setIsLoaderVisible(false);
      setRefreshing(false);
      setTimeout(() => {
        showToast(ScreenText.MY_APP_SOMETHING_WRONG);
      }, 10);
      print_data(error + "==========");
    }
  };

  return (
    <AppSafeAreaView backgroundColor={Colors.White}>
      <AppStatusBar backgroundColor={Colors.White} isTransperent={false} />
      <Modal animationType="none" transparent={true} visible={isVisible}>
        <View style={styles.modalContainer}>
          <View style={commonStyles.alignCenterView}>
            <YoutubePlayer
              height={height}
              width={"100%"}
              play={false}
              onReady={() => setVideoLoading(false)}
              onError={() => setVideoLoading(false)}
              videoId={Constant.VIDEO_KEY}
            />
            {isVideoLoading && (
              <View style={styles.loadingViewStyle}>
                <ActivityIndicator size="large" color={Colors.White} />
              </View>
            )}
            <Pressable
              onPress={() => setVisible(false)}
              style={styles.cancelContainer}
            >
              <MyCartCancelIcon style={styles.cancelButtonIcon} />
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal
        visible={sendVisible}
        transparent
        onRequestClose={() => {
          setSendVisible(false);
        }}
      >
        <Pressable
          style={styles.modelEndView}
          onPress={() => setSendVisible(false)}
        >
          <View style={styles.modalView}>
            <View style={styles.horizontalView}>
              <Pressable
                onPress={() => setSendVisible(false)}
                style={styles.cancelButton}
              >
                <MyCartCancelIcon style={styles.cancelIcon} />
              </Pressable>
              <View style={styles.textContainerView}>
                <Image
                  style={styles.logoImageStyle}
                  source={Images.splashLogo}
                />
                <Text style={styles.userValidEmailText}>
                  {ScreenText.CONTACT_SEND_SUCCESS}
                </Text>
              </View>
            </View>
          </View>
        </Pressable>
      </Modal>
      <View style={styles.rootContainerStyle}>
        <View style={styles.contentStyle}>
          <View style={styles.searchHeaderStyle}>
            <View style={styles.serchContainerStyle}>
              <SearchBarIcon
                style={styles.searchIconStyle}
                color={Colors.ThemeColor}
              />
              <TextInput
                style={styles.searchTextinputStyle}
                placeholder={ScreenText.SEARCH_TESTS}
                placeholderTextColor={Colors.transparantGrayColor}
                numberOfLines={1}
                value={search}
                onChangeText={(text) => {
                  setSearch(text);
                  searchFilterFunction(text, masterDataSource);
                  setSerchLayoutVisible(true);
                }}
              />
              {search.length > 0 && (
                <Pressable onPress={clearData}>
                  <Image
                    source={Images.cancelSearchIcon}
                    style={styles.searchCancelIcon}
                  />
                </Pressable>
              )}
            </View>
            <Pressable onPress={() => onBlogPress()}>
              {/* <Image source={Images.blogIcon} style={styles.blogIcon} /> */}
              <BlogIcon style={styles.blogIcon} />
            </Pressable>
            <Pressable onPress={() => onwatsapp()}>
              <Image
                style={styles.whatsAppIconStyle}
                source={Images.whatsAppIcon}
                resizeMode={"contain"}
              />
            </Pressable>
          </View>
          <ScrollView
            ref={ref}
            nestedScrollEnabled={true}
            contentContainerStyle={styles.scrollViewStyle}
            overScrollMode={"never"}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={"handled"}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View style={styles.imageSliderContainerStyle}>
              <ImageSlider
                renderItem={(item, index) => renderItem(item)}
                activeDotStyle={styles.activeDotStyle}
                dotStyle={styles.dotStyle}
                data={sliderImage}
              />
            </View>
            <View style={styles.buttonContainerStyle}>
              <View style={styles.buttonInnerContainerStyle}>
                <CustomGradientButton
                  gradientColors={[
                    Colors.gradientColor,
                    Colors.gradientColor,
                    Colors.gradientColor2,
                  ]}
                  isShowIcon={true}
                  iconImage={<VideoIcon style={styles.videoIconStyle} />}
                  containerStyle={styles.howWorksButtonStyle}
                  buttonTextStyle={styles.howWorksButtonTextStyle}
                  buttonText={ScreenText.HOW_IT_WORKS}
                  onButtonClick={onHowItWorkPress}
                />
              </View>
              <Pressable
                style={styles.myTestButtonStyle}
                onPress={onSmpleTestPress}
              >
                <Text style={styles.sampleTextStyle}>
                  {ScreenText.SAMPLE_TESTS}
                </Text>
              </Pressable>
            </View>
            <Text style={styles.aboutUsTextStyle}>{ScreenText.ABOUT_US}</Text>
            {/* <ReadMore
                // numberOfLines={5}
                numberOfLines={3}
                style={styles.htmlTextStyle}
                seeMoreText={ScreenText.READ_MORE}
                seeLessText={ScreenText.READ_LESS}
                seeMoreStyle={styles.readMoreTextStyle}
                seeLessStyle={styles.readMoreTextStyle}
                onExpand={() => onExpand()}
                onCollapse={() => onCollapse()}
              >
                {ScreenText.GO_TO_EXTRA_MILE_DESC}
                <BoldText>{ScreenText.MCQ}</BoldText>
                {ScreenText.INTENSIVE_TEXT}
                {"\n"} {"\n"}
                <BoldText>{ScreenText.ORGANIZATION_TEXT}</BoldText>
                {ScreenText.THE_SITE_OVER}
                <BoldText>{ScreenText.UNIQ_QUESTIONS}</BoldText>
                {ScreenText.INDIVIDUAL_MCQ}
                <BoldText>{ScreenText.CHAPTERS_TEXT}</BoldText>
                {ScreenText.CHAPTER_TITLE}
                <BoldText>{ScreenText.OMNIBUS}</BoldText>
                {ScreenText.OMNIBUS_TITLE}
                {"\n"} {"\n"}
                {ScreenText.MOST_OF_TEST}
                <BoldText>{ScreenText.FEEDBACK_TEXT}</BoldText>
                {ScreenText.WILL_AVAILBALE_TEXT}
                {"\n"} {"\n"}
                <BoldText>{ScreenText.GO_THE_EXTRAMILE_NURSES_TEXT}</BoldText>
                {ScreenText.INTESIVETEXT}
                <BoldText>{ScreenText.CERTIFICATE_TEXT}</BoldText>
                {"\n"} {"\n"}
                {ScreenText.IT_IS_POSSIBLE_TEXT}
                {"\n"} {"\n"}
                <BoldText>{ScreenText.FOR_INDIVIDUAL_TEXT}</BoldText>
              </ReadMore> */}

            <View>
              <Text
                onTextLayout={onTextLayout}
                numberOfLines={textShown ? undefined : 6}
                style={styles.htmlTextStyle}
              >
                {ScreenText.GO_TO_EXTRA_MILE_DESC}
                <BoldText>{ScreenText.MCQ}</BoldText>
                {ScreenText.INTENSIVE_TEXT}
                {"\n"} {"\n"}
                <BoldText>{ScreenText.ORGANIZATION_TEXT}</BoldText>
                {ScreenText.THE_SITE_OVER}
                <BoldText>{ScreenText.UNIQ_QUESTIONS}</BoldText>
                {ScreenText.INDIVIDUAL_MCQ}
                <BoldText>{ScreenText.TESTS}</BoldText>
                {ScreenText.TESTS_DETAILS}
                <BoldText>{ScreenText.CHAPTER}</BoldText>
                {ScreenText.CHAPTER_TITLE}
                <BoldText>{ScreenText.OMNIBUS}</BoldText>
                {ScreenText.OMNIBUS_TITLE}
                {"\n"} {"\n"}
                <BoldText>{ScreenText.EXAM_STYLE_TESTS}</BoldText>
                {ScreenText.QUESTIONS_TESTS_TITLE}
                <BoldText>{ScreenText.LERN_X_TESTS}</BoldText>
                {ScreenText.MCQ_TESTS}
                {"\n"} {"\n"}
                <BoldText>{ScreenText.FEATURES}</BoldText>
                {"\n"}
                <TopicView>{ScreenText.ONLINE_TESTS}</TopicView>
                {"\n"}
                <TopicView>{ScreenText.TESTS_TIME}</TopicView>
                {"\n"}
                <TopicView>{ScreenText.INSTANT_MARKETING}</TopicView>
                {"\n"}
                <TopicView>{ScreenText.DETAIL_FEEDBACK}</TopicView>
                {"\n"}
                <TopicView>{ScreenText.EMAIL_RESULT}</TopicView>
                {"\n"}
                <TopicView>{ScreenText.PREVIOUS_SCORES}</TopicView>
                {"\n"}
                <TopicView>{ScreenText.STUDY_GROUPS}</TopicView>
                {"\n"}
                <TopicView>{ScreenText.NO_ADS}</TopicView>
                {"\n"}
                <TopicView>{ScreenText.ONE_YEAR_SUBSCRIPTION}</TopicView>
                {/* {"\n"}
                <TopicView>{ScreenText.NO_AUTO_RENEWAL}</TopicView> */}
                {"\n"} {"\n"}
                <BoldText>{ScreenText.EDIC_OMNIBUS}</BoldText>
                {"\n"}
                <TopicView>{ScreenText.OMNIBUS_CONTAIN}</TopicView>
                {"\n"}
                <TopicView>{ScreenText.OMNIBUS_EDIC_MOCK_EXAMS}</TopicView>
                {"\n"}
                <TopicView>{ScreenText.OMNIBUS_TEST}</TopicView>
                {"\n"}
                <TopicView>{ScreenText.OMNIBUS_ANS}</TopicView>
                <BoldText>{ScreenText.OMNIBUS_AT_THE_END}</BoldText>
                <TopicView>{ScreenText.OMNIBUS_OF_THE_TEST}</TopicView>
                {"\n"}
                <TopicView>{ScreenText.OMNIBUS_EDIC_MOCK}</TopicView>
                {"\n"} {"\n"}
                <BoldText>{ScreenText.LEARN_X}</BoldText>
                {"\n"}
                <TopicView>{ScreenText.LEARN_X_CONTAINS}</TopicView>
                {"\n"}
                <TopicView>{ScreenText.LEARN_X_QUESTINS}</TopicView>
                {"\n"}
                <TopicView>{ScreenText.LEARN_X_ANSWERS}</TopicView>
                <BoldText>{ScreenText.LEARN_X_EVERY_QUESTIONS}</BoldText>
                <TopicView>{ScreenText.LEARN_X_AGAIN_TEST}</TopicView>
                {"\n"}
                <TopicView>{ScreenText.LEARN_X_MCQ}</TopicView>
                {"\n"}
                <TopicView>{ScreenText.LEARN_X_PROVIDES}</TopicView>
                {"\n"} {"\n"}
                <BoldText>{ScreenText.GO_THE_EXTRAMILE_NURSES_TEXT}</BoldText>
                {ScreenText.INTESIVETEXT}
                <BoldText>{ScreenText.CERTIFICATE_TEXT}</BoldText>
              </Text>
              {lengthMore ? (
                <Pressable onPress={toggleNumberOfLines}>
                  <Text style={styles.readMoreTextStyle}>
                    {textShown ? ScreenText.SHOW_LESS : ScreenText.SHOW_MORE}
                  </Text>
                </Pressable>
              ) : null}
            </View>
            <Text style={styles.categoryTextStyle}>
              {ScreenText.CATEGORIES}
            </Text>
            <FlatList
              contentContainerStyle={styles.flatlistStyle}
              data={categoriesData}
              extraData={categoriesData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={(item, index) => renderCategoryItem(item, index)}
            />
            <Text style={styles.categoryTextStyle}>
              {ScreenText.TESTIMONIALS}
            </Text>
            <View style={styles.testMonialsContainer}>
              <TestimonialsSlider
                keyExtractor={(item, index) => index.toString()}
                skipLabel={false}
                doneLabel={false}
                renderItem={(item, index) => renderImageItem(item, index)}
                showSkipButton
                showPrevButton
                activeDotStyle={styles.activeDotStyle}
                showNextButton={true}
                renderPrevButton={() => renderPreButton()}
                renderNextButton={() => renderNextButton()}
                onSlideChange={(current_position) => {
                  setCurrentIndex(current_position);
                }}
                data={sliderPage}
              />
            </View>
            <View style={styles.viewContactUs}>
              <Text style={styles.categoryTextStyle}>
                {ScreenText.CONTACT_US}
              </Text>
              <Pressable onPress={() => onwatsapp()}>
                <Image
                  style={styles.viewWhatsApp}
                  source={Images.whatsapp}
                  resizeMode={"stretch"}
                />
              </Pressable>
              <View style={styles.viewFormList}>
                <CustomTextInput
                  ref={userNameRef}
                  containerStyle={commonStyles.inputTextContainerStyle}
                  textInputStyle={commonStyles.textInputStyle}
                  lableText={ScreenText.FULL_NAME}
                  lableTextStyle={commonStyles.labelTextFormStyle}
                  inputTextStyle={commonStyles.inputTextStyle}
                  value={userName}
                  onChangeText={(text) => {
                    setUserName(text);
                    showNameError(false);
                  }}
                  onSubmitEditing={() => {
                    if (userEmailRef) {
                      userEmailRef.current.focus();
                    }
                  }}
                />
                <View style={styles.fullWidthStyle}>
                  <ErrorText
                    errorText={nameErrorText}
                    is_visible={isShowNameError}
                  />
                </View>
                <CustomTextInput
                  ref={userEmailRef}
                  containerStyle={commonStyles.inputTextContainerStyle}
                  textInputStyle={commonStyles.textInputStyle}
                  lableText={ScreenText.USER_Email}
                  lableTextStyle={commonStyles.labelTextFormStyle}
                  inputTextStyle={commonStyles.inputTextStyle}
                  value={userEmail}
                  keyboardType={"email-address"}
                  onChangeText={(text) => {
                    setUserEmail(text);
                    showEmailError(false);
                  }}
                  onSubmitEditing={() => {
                    if (userMessageRef) {
                      userMessageRef.current.focus();
                    }
                  }}
                />
                <View style={styles.fullWidthStyle}>
                  <ErrorText
                    errorText={emailErrorText}
                    is_visible={isShowEmailError}
                  />
                </View>
                <CustomMessageTextInput
                  containerStyle={commonStyles.inputTextContainerStyle}
                  ref={userMessageRef}
                  textInputStyle={styles.textInputStyle}
                  inputTextStyle={commonStyles.mobileInputTextStyle}
                  lableTextStyle={commonStyles.labelTextFormStyle}
                  lableText={ScreenText.YOUR_MESSAGE}
                  value={userMessage}
                  onChangeText={(text) => {
                    setUserMessage(text);
                    showMessageError(false);
                  }}
                />
                <View style={styles.fullWidthStyle}>
                  <ErrorText
                    errorText={messageErrorText}
                    is_visible={isShowMessageError}
                  />
                </View>
                <CustomGradientButton
                  gradientColors={[
                    Colors.gradientColor,
                    Colors.gradientColor,
                    Colors.gradientColor2,
                  ]}
                  containerStyle={styles.buttonContainer}
                  buttonTextStyle={commonStyles.loginButtonTextStyle}
                  buttonText={ScreenText.SEND_BUTTON}
                  onButtonClick={() => onSendPress()}
                />
              </View>
              <Text style={styles.australianNoText}>
                {ScreenText.AUSTRALIAN_NO}
              </Text>
            </View>
            {Platform.OS === "ios" ? (
              <KeyboardSpacer />
            ) : (
              <View style={commonStyles.bottomView} />
            )}
          </ScrollView>
          {serchLayoutVisible && (
            <View style={styles.positionView}>
              <ScrollView
                nestedScrollEnabled={true}
                contentContainerStyle={styles.scrollViewStyle}
                overScrollMode={"never"}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={"handled"}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
              >
                <View style={styles.searchContainer}>
                  <Text style={styles.resultTitle}>
                    {ScreenText.SEARCH_RESULTS}
                  </Text>
                  <Pressable
                    onPress={() => onCancelPressIcon()}
                    style={styles.cancelContainerView}
                  >
                    <MyCartCancelIcon style={styles.cancelIcon} />
                  </Pressable>
                </View>

                {search.length !== 0 && (
                  <>
                    {filterData1.length === 0 ? (
                      <Text style={styles.notDataTitle}>
                        {ScreenText.NO_SEARCH_DATA_FOUND}
                      </Text>
                    ) : (
                      <FlatList
                        data={filterData1}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={(item, index) => ItemView(item, index)}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.searchBottomView}
                      />
                    )}
                  </>
                )}
              </ScrollView>
            </View>
          )}
        </View>
        {isLoadervisible && (
          <View style={commonStyles.loader}>
            <Loader />
          </View>
        )}
      </View>
    </AppSafeAreaView>
  );
};

export default Dashboard;
