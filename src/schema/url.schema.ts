import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
// instantiate a mongoose schema

export type UrlDocument = Url & Document;

@Schema()
export class Url {
  @Prop()
  urlCode: string;
  @Prop()
  longUrl: string;
  @Prop()
  shortUrl: string;
  @Prop({ default: Date.now() })
  date: string;
}

// create a model from schema and export it
export const UrlSchema = SchemaFactory.createForClass(Url);
