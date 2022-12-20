// @generated by protobuf-ts 2.5.0
// @generated from protobuf file "protobuf/protos/api/leagues/OccurrenceRate.proto" (package "ApiProtos.Leagues.LeaguesOccurrenceRate", syntax proto3)
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
/**
 * @generated from protobuf message ApiProtos.Leagues.LeaguesOccurrenceRate.OccurrenceRate
 */
export interface OccurrenceRate {
    /**
     * @generated from protobuf field: repeated ApiProtos.Leagues.LeaguesOccurrenceRate.OccurrenceRate.SelectionInfo statisticsData = 1;
     */
    statisticsData: OccurrenceRate_SelectionInfo[]; // 比分統計資訊
    /**
     * @generated from protobuf field: repeated ApiProtos.Leagues.LeaguesOccurrenceRate.OccurrenceRate.SelectionInfo statisticsHalfScoreData = 2;
     */
    statisticsHalfScoreData: OccurrenceRate_SelectionInfo[]; // 半場比分統計
    /**
     * @generated from protobuf field: int32 totalCount = 3;
     */
    totalCount: number; // 總場數
}
/**
 * @generated from protobuf message ApiProtos.Leagues.LeaguesOccurrenceRate.OccurrenceRate.SelectionInfo
 */
export interface OccurrenceRate_SelectionInfo {
    /**
     * @generated from protobuf field: string selectionName = 1;
     */
    selectionName: string; // 整場選項名稱 (0-0 0-1 0-2 0-3 1-0 1-1 1-2 1-3 2-0 2-1 2-2 2-3 3-0 3-1 3-2 3-3 homeFourOrMore awayFourOrMore) 半場選項名稱 0-0 0-1 0-2 1-0 1-1 1-2 2-0 2-1 2-2 other
    /**
     * @generated from protobuf field: int32 appearCnt = 2;
     */
    appearCnt: number; // 出現次數
    /**
     * @generated from protobuf field: int32 notAppearCnt = 3;
     */
    notAppearCnt: number; // 未出現次數
    /**
     * @generated from protobuf field: string appearRate = 4;
     */
    appearRate: string; // 出現比率
    /**
     * @generated from protobuf field: string notAppearRate = 5;
     */
    notAppearRate: string; // 未出現比率
    /**
     * @generated from protobuf field: int32 appearRank = 6;
     */
    appearRank: number; // 出現排名
    /**
     * @generated from protobuf field: int32 notAppearRank = 7;
     */
    notAppearRank: number; // 未出現排名
}
// @generated message type with reflection information, may provide speed optimized methods
class OccurrenceRate$Type extends MessageType<OccurrenceRate> {
    constructor() {
        super("ApiProtos.Leagues.LeaguesOccurrenceRate.OccurrenceRate", [
            { no: 1, name: "statisticsData", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => OccurrenceRate_SelectionInfo },
            { no: 2, name: "statisticsHalfScoreData", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => OccurrenceRate_SelectionInfo },
            { no: 3, name: "totalCount", kind: "scalar", T: 5 /*ScalarType.INT32*/ }
        ]);
    }
    create(value?: PartialMessage<OccurrenceRate>): OccurrenceRate {
        const message = { statisticsData: [], statisticsHalfScoreData: [], totalCount: 0 };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<OccurrenceRate>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: OccurrenceRate): OccurrenceRate {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated ApiProtos.Leagues.LeaguesOccurrenceRate.OccurrenceRate.SelectionInfo statisticsData */ 1:
                    message.statisticsData.push(OccurrenceRate_SelectionInfo.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case /* repeated ApiProtos.Leagues.LeaguesOccurrenceRate.OccurrenceRate.SelectionInfo statisticsHalfScoreData */ 2:
                    message.statisticsHalfScoreData.push(OccurrenceRate_SelectionInfo.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case /* int32 totalCount */ 3:
                    message.totalCount = reader.int32();
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
    internalBinaryWrite(message: OccurrenceRate, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* repeated ApiProtos.Leagues.LeaguesOccurrenceRate.OccurrenceRate.SelectionInfo statisticsData = 1; */
        for (let i = 0; i < message.statisticsData.length; i++)
            OccurrenceRate_SelectionInfo.internalBinaryWrite(message.statisticsData[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* repeated ApiProtos.Leagues.LeaguesOccurrenceRate.OccurrenceRate.SelectionInfo statisticsHalfScoreData = 2; */
        for (let i = 0; i < message.statisticsHalfScoreData.length; i++)
            OccurrenceRate_SelectionInfo.internalBinaryWrite(message.statisticsHalfScoreData[i], writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        /* int32 totalCount = 3; */
        if (message.totalCount !== 0)
            writer.tag(3, WireType.Varint).int32(message.totalCount);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message ApiProtos.Leagues.LeaguesOccurrenceRate.OccurrenceRate
 */
export const OccurrenceRate = new OccurrenceRate$Type();
// @generated message type with reflection information, may provide speed optimized methods
class OccurrenceRate_SelectionInfo$Type extends MessageType<OccurrenceRate_SelectionInfo> {
    constructor() {
        super("ApiProtos.Leagues.LeaguesOccurrenceRate.OccurrenceRate.SelectionInfo", [
            { no: 1, name: "selectionName", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "appearCnt", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 3, name: "notAppearCnt", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 4, name: "appearRate", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "notAppearRate", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 6, name: "appearRank", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 7, name: "notAppearRank", kind: "scalar", T: 5 /*ScalarType.INT32*/ }
        ]);
    }
    create(value?: PartialMessage<OccurrenceRate_SelectionInfo>): OccurrenceRate_SelectionInfo {
        const message = { selectionName: "", appearCnt: 0, notAppearCnt: 0, appearRate: "", notAppearRate: "", appearRank: 0, notAppearRank: 0 };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<OccurrenceRate_SelectionInfo>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: OccurrenceRate_SelectionInfo): OccurrenceRate_SelectionInfo {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string selectionName */ 1:
                    message.selectionName = reader.string();
                    break;
                case /* int32 appearCnt */ 2:
                    message.appearCnt = reader.int32();
                    break;
                case /* int32 notAppearCnt */ 3:
                    message.notAppearCnt = reader.int32();
                    break;
                case /* string appearRate */ 4:
                    message.appearRate = reader.string();
                    break;
                case /* string notAppearRate */ 5:
                    message.notAppearRate = reader.string();
                    break;
                case /* int32 appearRank */ 6:
                    message.appearRank = reader.int32();
                    break;
                case /* int32 notAppearRank */ 7:
                    message.notAppearRank = reader.int32();
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
    internalBinaryWrite(message: OccurrenceRate_SelectionInfo, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string selectionName = 1; */
        if (message.selectionName !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.selectionName);
        /* int32 appearCnt = 2; */
        if (message.appearCnt !== 0)
            writer.tag(2, WireType.Varint).int32(message.appearCnt);
        /* int32 notAppearCnt = 3; */
        if (message.notAppearCnt !== 0)
            writer.tag(3, WireType.Varint).int32(message.notAppearCnt);
        /* string appearRate = 4; */
        if (message.appearRate !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.appearRate);
        /* string notAppearRate = 5; */
        if (message.notAppearRate !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.notAppearRate);
        /* int32 appearRank = 6; */
        if (message.appearRank !== 0)
            writer.tag(6, WireType.Varint).int32(message.appearRank);
        /* int32 notAppearRank = 7; */
        if (message.notAppearRank !== 0)
            writer.tag(7, WireType.Varint).int32(message.notAppearRank);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message ApiProtos.Leagues.LeaguesOccurrenceRate.OccurrenceRate.SelectionInfo
 */
export const OccurrenceRate_SelectionInfo = new OccurrenceRate_SelectionInfo$Type();