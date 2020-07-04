export interface ContentTypeVo {
  name: string;
}
export interface Lesson {
  _id: string;
  name: string;
  thumbUrl: string;
  videoUrl: string;
  description: string;
  contentsType: Array<ContentTypeVo>;
  tutorExternalId: string;
  createdAt: Date;
  updatedAt: Date;
}
