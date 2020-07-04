import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Lesson } from '~/types/entities/Lesson';
import { loadStudentLessons } from '~/store/ducks/student';
import { NoResults } from '~/components/NoResults';
import { LessonCard } from '~/components/LessonCard';
import { SafeAreaView } from './HomeScreen.styles';

export const HomeScreen = () => {
  const dispatch = useDispatch();
  const lessons = useSelector((state: ReduxState) => state.student.lessons);
  const isLoading = useSelector((state: ReduxState) => state.student.isLoading);

  const [isRefreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(loadStudentLessons());
  }, [dispatch]);

  const handleRefresh = async () => {
    setRefreshing(true);
    // await dispatch(loadStudentLessons());
    setRefreshing(false);
  };

  const renderNoResults = () => {
    if (!isLoading && !isRefreshing) {
      return <NoResults />;
    }

    return null;
  };

  if (!lessons || lessons.length === 0) {
    return renderNoResults();
  }

  return (
    <SafeAreaView>
      <FlatList
        testID="listings-flatlist"
        data={lessons}
        renderItem={({ item, index }) => (
          <LessonCard data={item} index={index} onClick={() => {}} />
        )}
        keyExtractor={({ _id }: Lesson) => _id.toString()}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        contentContainerStyle={{ paddingBottom: 100 }}
        onEndReachedThreshold={0.5}
        onEndReached={() => {}}
      />
    </SafeAreaView>
  );
};
