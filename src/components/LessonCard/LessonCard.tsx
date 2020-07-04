import React from 'react';
import { format } from 'date-fns';
import { Lesson } from '~/types/entities/Lesson';
import {
  CardWrapper,
  LessonImage,
  LessonInfo,
  Title,
  PublishedAt,
  ImageWrapper,
  Description,
  Badge
} from '~/components/LessonCard/LessonCard.styles';

interface Props {
  data: Lesson;
  index: number;
  onClick?: (selectedData: Product) => void;
}

export const LessonCard = ({ data, index, onClick }: Props) => {
  const showListingsDetails = async () => {
    if (onClick) {
      onClick(data);
    }
  };

  return (
    <CardWrapper testID="lesson-card" first={index === 0} onPress={showListingsDetails}>
      <ImageWrapper>
        <LessonImage source={{ uri: data.thumbUrl }} resizeMode="stretch" />
        {data.contentsType?.length > 0 && <Badge>{data.contentsType[0].name}</Badge>}
      </ImageWrapper>
      <LessonInfo>
        <PublishedAt>Published at {format(new Date(data.createdAt), 'dd/MM/yy HH:mm')}</PublishedAt>
        <Title>{data.name}</Title>
        <Description>
          {data.description}
        </Description>
      </LessonInfo>
    </CardWrapper>
  );
};
