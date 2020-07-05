import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { StackScreenProps } from '~/types/routes/StackScreenProps';
import { Lesson } from '~/types/entities/Lesson';
import { loadStudentLessons } from '~/store/ducks/student';
import { NoResults } from '~/components/NoResults';
import { LessonCard } from '~/components/LessonCard';
import { SearchInput } from '~/components/SearchInput';
import { SafeAreaView, LoadingWrapper } from './HomeScreen.styles';
import { ReduxState } from '~/types/store/ReduxState';

export const HomeScreen = ({ navigation }: StackScreenProps) => {
  const dispatch = useDispatch();
  const lessons = useSelector((state: ReduxState) => state.student.lessons);
  const isLoading = useSelector((state: ReduxState) => state.student.isLoading);

  const [isRefreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(loadStudentLessons());
  }, [dispatch]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await dispatch(loadStudentLessons());
    setRefreshing(false);
  };

  const renderNoResults = () => {
    if (!isLoading && !isRefreshing) {
      return (
        <SafeAreaView>
          <SearchInput />
          <NoResults />
        </SafeAreaView>
      );
    }

    return null;
  };

  const renderLoading = () => {
    return (
      <LoadingWrapper>
        <ActivityIndicator size="large" color="#db4c77" />
      </LoadingWrapper>
    );
  };

  if (isLoading) {
    return renderLoading();
  }

  if (!lessons || lessons.length === 0) {
    return renderNoResults();
  }

  const handleSelectedLesson = async (selectedData: Lesson) => {
    navigation.navigate('Lesson', {
      lesson: selectedData,
    });
  };

  return (
    <SafeAreaView>
      <SearchInput />
      <FlatList
        data={lessons}
        renderItem={({ item, index }) => (
          <LessonCard
            data={item}
            index={index}
            onClick={handleSelectedLesson}
          />
        )}
        keyExtractor={({ _id }: Lesson) => _id.toString()}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{ paddingBottom: 100 }}
        // onEndReachedThreshold={0.5}
        // onEndReached={() => {}}
      />
    </SafeAreaView>
  );
};
