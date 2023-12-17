import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {

    @Prop()
    locationName: string;

    @Prop()
    placeId: string;

    @Prop()
    lat: number;

    @Prop()
    lng: number;
}

export const UserSchema = SchemaFactory.createForClass(User);