// @generated by protobuf-ts 2.5.0
// @generated from protobuf file "protobuf/protos/api/matches/MatchList.proto" (package "ApiProtos.Matches.MatchList", syntax proto3)
// tslint:disable
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MESSAGE_TYPE } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
import { MatchData } from "../../socket/MatchInfo";
import { Area } from "../../socket/MatchInfo";
/**
 * @generated from protobuf message ApiProtos.Matches.MatchList.MatchList
 */
export interface MatchList {
    /**
     * @generated from protobuf field: repeated socketProtos.MatchInfo.Area areas = 1;
     */
    areas: Area[]; // 地區列表
    /**
     * @generated from protobuf field: repeated socketProtos.MatchInfo.MatchData matches = 2;
     */
    matches: MatchData[]; // 賽事列表
}
// @generated message type with reflection information, may provide speed optimized methods
class MatchList$Type extends MessageType<MatchList> {
    constructor() {
        super("ApiProtos.Matches.MatchList.MatchList", [
            { no: 1, name: "areas", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Area },
            { no: 2, name: "matches", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => MatchData }
        ]);
    }
    create(value?: PartialMessage<MatchList>): MatchList {
        const message = { areas: [], matches: [] };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<MatchList>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: MatchList): MatchList {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated socketProtos.MatchInfo.Area areas */ 1:
                    message.areas.push(Area.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case /* repeated socketProtos.MatchInfo.MatchData matches */ 2:
                    message.matches.push(MatchData.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: MatchList, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* repeated socketProtos.MatchInfo.Area areas = 1; */
        for (let i = 0; i < message.areas.length; i++)
            Area.internalBinaryWrite(message.areas[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* repeated socketProtos.MatchInfo.MatchData matches = 2; */
        for (let i = 0; i < message.matches.length; i++)
            MatchData.internalBinaryWrite(message.matches[i], writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message ApiProtos.Matches.MatchList.MatchList
 */
export const MatchList = new MatchList$Type();
