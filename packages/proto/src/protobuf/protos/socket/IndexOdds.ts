// @generated by protobuf-ts 2.5.0
// @generated from protobuf file "protobuf/protos/socket/IndexOdds.proto" (package "socketProtos.IndexOdds", syntax proto3)
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
import { Command } from "./Socket";
/**
 * @generated from protobuf message socketProtos.IndexOdds.IndexUpdate
 */
export interface IndexUpdate {
    /**
     * @generated from protobuf field: socketProtos.command.Command command = 1;
     */
    command: Command;
    /**
     * @generated from protobuf field: repeated socketProtos.IndexOdds.IndexInfo data = 2;
     */
    data: IndexInfo[];
}
/**
 * @generated from protobuf message socketProtos.IndexOdds.IndexInfo
 */
export interface IndexInfo {
    /**
     * @generated from protobuf field: int32 matchId = 1;
     */
    matchId: number; // 賽事id
    /**
     * @generated from protobuf field: repeated socketProtos.IndexOdds.Odds odds = 2;
     */
    odds: Odds[]; // 盤口資訊
}
/**
 * @generated from protobuf message socketProtos.IndexOdds.Odds
 */
export interface Odds {
    /**
     * @generated from protobuf field: string oddType = 1;
     */
    oddType: string; // 盤口種類 asia亞盤 eu歐盤 bs大小球
    /**
     * @generated from protobuf field: bool status = 2;
     */
    status: boolean; // 是否開賽
    /**
     * @generated from protobuf field: string home = 3;
     */
    home: string; // 主勝
    /**
     * @generated from protobuf field: string handicap = 4;
     */
    handicap: string; // 和、盤口
    /**
     * @generated from protobuf field: string away = 5;
     */
    away: string; // 客勝
    /**
     * @generated from protobuf field: int32 timestamp = 6;
     */
    timestamp: number; // 變盤時間
    /**
     * @generated from protobuf field: bool closed = 7;
     */
    closed: boolean; // 是否封盤
}
// @generated message type with reflection information, may provide speed optimized methods
class IndexUpdate$Type extends MessageType<IndexUpdate> {
    constructor() {
        super("socketProtos.IndexOdds.IndexUpdate", [
            { no: 1, name: "command", kind: "enum", T: () => ["socketProtos.command.Command", Command] },
            { no: 2, name: "data", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => IndexInfo }
        ]);
    }
    create(value?: PartialMessage<IndexUpdate>): IndexUpdate {
        const message = { command: 0, data: [] };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<IndexUpdate>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: IndexUpdate): IndexUpdate {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* socketProtos.command.Command command */ 1:
                    message.command = reader.int32();
                    break;
                case /* repeated socketProtos.IndexOdds.IndexInfo data */ 2:
                    message.data.push(IndexInfo.internalBinaryRead(reader, reader.uint32(), options));
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
    internalBinaryWrite(message: IndexUpdate, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* socketProtos.command.Command command = 1; */
        if (message.command !== 0)
            writer.tag(1, WireType.Varint).int32(message.command);
        /* repeated socketProtos.IndexOdds.IndexInfo data = 2; */
        for (let i = 0; i < message.data.length; i++)
            IndexInfo.internalBinaryWrite(message.data[i], writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message socketProtos.IndexOdds.IndexUpdate
 */
export const IndexUpdate = new IndexUpdate$Type();
// @generated message type with reflection information, may provide speed optimized methods
class IndexInfo$Type extends MessageType<IndexInfo> {
    constructor() {
        super("socketProtos.IndexOdds.IndexInfo", [
            { no: 1, name: "matchId", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "odds", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Odds }
        ]);
    }
    create(value?: PartialMessage<IndexInfo>): IndexInfo {
        const message = { matchId: 0, odds: [] };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<IndexInfo>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: IndexInfo): IndexInfo {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* int32 matchId */ 1:
                    message.matchId = reader.int32();
                    break;
                case /* repeated socketProtos.IndexOdds.Odds odds */ 2:
                    message.odds.push(Odds.internalBinaryRead(reader, reader.uint32(), options));
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
    internalBinaryWrite(message: IndexInfo, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* int32 matchId = 1; */
        if (message.matchId !== 0)
            writer.tag(1, WireType.Varint).int32(message.matchId);
        /* repeated socketProtos.IndexOdds.Odds odds = 2; */
        for (let i = 0; i < message.odds.length; i++)
            Odds.internalBinaryWrite(message.odds[i], writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message socketProtos.IndexOdds.IndexInfo
 */
export const IndexInfo = new IndexInfo$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Odds$Type extends MessageType<Odds> {
    constructor() {
        super("socketProtos.IndexOdds.Odds", [
            { no: 1, name: "oddType", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "status", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 3, name: "home", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "handicap", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "away", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 6, name: "timestamp", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 7, name: "closed", kind: "scalar", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
    create(value?: PartialMessage<Odds>): Odds {
        const message = { oddType: "", status: false, home: "", handicap: "", away: "", timestamp: 0, closed: false };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<Odds>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Odds): Odds {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string oddType */ 1:
                    message.oddType = reader.string();
                    break;
                case /* bool status */ 2:
                    message.status = reader.bool();
                    break;
                case /* string home */ 3:
                    message.home = reader.string();
                    break;
                case /* string handicap */ 4:
                    message.handicap = reader.string();
                    break;
                case /* string away */ 5:
                    message.away = reader.string();
                    break;
                case /* int32 timestamp */ 6:
                    message.timestamp = reader.int32();
                    break;
                case /* bool closed */ 7:
                    message.closed = reader.bool();
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
    internalBinaryWrite(message: Odds, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string oddType = 1; */
        if (message.oddType !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.oddType);
        /* bool status = 2; */
        if (message.status !== false)
            writer.tag(2, WireType.Varint).bool(message.status);
        /* string home = 3; */
        if (message.home !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.home);
        /* string handicap = 4; */
        if (message.handicap !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.handicap);
        /* string away = 5; */
        if (message.away !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.away);
        /* int32 timestamp = 6; */
        if (message.timestamp !== 0)
            writer.tag(6, WireType.Varint).int32(message.timestamp);
        /* bool closed = 7; */
        if (message.closed !== false)
            writer.tag(7, WireType.Varint).bool(message.closed);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message socketProtos.IndexOdds.Odds
 */
export const Odds = new Odds$Type();
