// @generated by protobuf-ts 2.5.0
// @generated from protobuf file "protobuf/protos/socket/SubscribeInfo.proto" (package "socketProtos.SubscribeInfo", syntax proto3)
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
 * @generated from protobuf message socketProtos.SubscribeInfo.SubscribeResult
 */
export interface SubscribeResult {
    /**
     * @generated from protobuf field: socketProtos.command.Command command = 1;
     */
    command: Command;
    /**
     * @generated from protobuf field: string identifier = 2;
     */
    identifier: string; // 識別碼 client提供
    /**
     * @generated from protobuf field: bool type = 3;
     */
    type: boolean; // 類別 ture訂閱 false取消訂閱
    /**
     * @generated from protobuf field: bool result = 4;
     */
    result: boolean; // 訂閱結果
    /**
     * @generated from protobuf field: string message = 5;
     */
    message: string; // 錯誤訊息
}
/**
 * @generated from protobuf message socketProtos.SubscribeInfo.SubscribeMatchDetail
 */
export interface SubscribeMatchDetail {
    /**
     * @generated from protobuf field: socketProtos.command.Command command = 1;
     */
    command: Command;
    /**
     * @generated from protobuf field: int32 matchId = 2;
     */
    matchId: number; // 賽事id
    /**
     * @generated from protobuf field: bool type = 3;
     */
    type: boolean; // 類別 ture訂閱 false取消訂閱
    /**
     * @generated from protobuf field: string identifier = 4;
     */
    identifier: string; // 識別碼 client提供
}
/**
 * @generated from protobuf message socketProtos.SubscribeInfo.SubscribeTgRecentMatches
 */
export interface SubscribeTgRecentMatches {
    /**
     * @generated from protobuf field: socketProtos.command.Command command = 1;
     */
    command: Command;
    /**
     * @generated from protobuf field: bool type = 3;
     */
    type: boolean; // 類別 ture訂閱 false取消訂閱
    /**
     * @generated from protobuf field: string identifier = 4;
     */
    identifier: string; // 識別碼 client提供
}
/**
 * @generated from protobuf message socketProtos.SubscribeInfo.SubscribeTgOdds
 */
export interface SubscribeTgOdds {
    /**
     * @generated from protobuf field: socketProtos.command.Command command = 1;
     */
    command: Command;
    /**
     * @generated from protobuf field: int32 matchId = 2;
     */
    matchId: number; // 賽事id
    /**
     * @generated from protobuf field: bool type = 3;
     */
    type: boolean; // 類別 ture訂閱 false取消訂閱
    /**
     * @generated from protobuf field: string identifier = 4;
     */
    identifier: string; // 識別碼 client提供
}
// @generated message type with reflection information, may provide speed optimized methods
class SubscribeResult$Type extends MessageType<SubscribeResult> {
    constructor() {
        super("socketProtos.SubscribeInfo.SubscribeResult", [
            { no: 1, name: "command", kind: "enum", T: () => ["socketProtos.command.Command", Command] },
            { no: 2, name: "identifier", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "type", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 4, name: "result", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 5, name: "message", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<SubscribeResult>): SubscribeResult {
        const message = { command: 0, identifier: "", type: false, result: false, message: "" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<SubscribeResult>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: SubscribeResult): SubscribeResult {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* socketProtos.command.Command command */ 1:
                    message.command = reader.int32();
                    break;
                case /* string identifier */ 2:
                    message.identifier = reader.string();
                    break;
                case /* bool type */ 3:
                    message.type = reader.bool();
                    break;
                case /* bool result */ 4:
                    message.result = reader.bool();
                    break;
                case /* string message */ 5:
                    message.message = reader.string();
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
    internalBinaryWrite(message: SubscribeResult, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* socketProtos.command.Command command = 1; */
        if (message.command !== 0)
            writer.tag(1, WireType.Varint).int32(message.command);
        /* string identifier = 2; */
        if (message.identifier !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.identifier);
        /* bool type = 3; */
        if (message.type !== false)
            writer.tag(3, WireType.Varint).bool(message.type);
        /* bool result = 4; */
        if (message.result !== false)
            writer.tag(4, WireType.Varint).bool(message.result);
        /* string message = 5; */
        if (message.message !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.message);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message socketProtos.SubscribeInfo.SubscribeResult
 */
export const SubscribeResult = new SubscribeResult$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SubscribeMatchDetail$Type extends MessageType<SubscribeMatchDetail> {
    constructor() {
        super("socketProtos.SubscribeInfo.SubscribeMatchDetail", [
            { no: 1, name: "command", kind: "enum", T: () => ["socketProtos.command.Command", Command] },
            { no: 2, name: "matchId", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 3, name: "type", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 4, name: "identifier", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<SubscribeMatchDetail>): SubscribeMatchDetail {
        const message = { command: 0, matchId: 0, type: false, identifier: "" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<SubscribeMatchDetail>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: SubscribeMatchDetail): SubscribeMatchDetail {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* socketProtos.command.Command command */ 1:
                    message.command = reader.int32();
                    break;
                case /* int32 matchId */ 2:
                    message.matchId = reader.int32();
                    break;
                case /* bool type */ 3:
                    message.type = reader.bool();
                    break;
                case /* string identifier */ 4:
                    message.identifier = reader.string();
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
    internalBinaryWrite(message: SubscribeMatchDetail, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* socketProtos.command.Command command = 1; */
        if (message.command !== 0)
            writer.tag(1, WireType.Varint).int32(message.command);
        /* int32 matchId = 2; */
        if (message.matchId !== 0)
            writer.tag(2, WireType.Varint).int32(message.matchId);
        /* bool type = 3; */
        if (message.type !== false)
            writer.tag(3, WireType.Varint).bool(message.type);
        /* string identifier = 4; */
        if (message.identifier !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.identifier);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message socketProtos.SubscribeInfo.SubscribeMatchDetail
 */
export const SubscribeMatchDetail = new SubscribeMatchDetail$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SubscribeTgRecentMatches$Type extends MessageType<SubscribeTgRecentMatches> {
    constructor() {
        super("socketProtos.SubscribeInfo.SubscribeTgRecentMatches", [
            { no: 1, name: "command", kind: "enum", T: () => ["socketProtos.command.Command", Command] },
            { no: 3, name: "type", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 4, name: "identifier", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<SubscribeTgRecentMatches>): SubscribeTgRecentMatches {
        const message = { command: 0, type: false, identifier: "" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<SubscribeTgRecentMatches>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: SubscribeTgRecentMatches): SubscribeTgRecentMatches {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* socketProtos.command.Command command */ 1:
                    message.command = reader.int32();
                    break;
                case /* bool type */ 3:
                    message.type = reader.bool();
                    break;
                case /* string identifier */ 4:
                    message.identifier = reader.string();
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
    internalBinaryWrite(message: SubscribeTgRecentMatches, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* socketProtos.command.Command command = 1; */
        if (message.command !== 0)
            writer.tag(1, WireType.Varint).int32(message.command);
        /* bool type = 3; */
        if (message.type !== false)
            writer.tag(3, WireType.Varint).bool(message.type);
        /* string identifier = 4; */
        if (message.identifier !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.identifier);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message socketProtos.SubscribeInfo.SubscribeTgRecentMatches
 */
export const SubscribeTgRecentMatches = new SubscribeTgRecentMatches$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SubscribeTgOdds$Type extends MessageType<SubscribeTgOdds> {
    constructor() {
        super("socketProtos.SubscribeInfo.SubscribeTgOdds", [
            { no: 1, name: "command", kind: "enum", T: () => ["socketProtos.command.Command", Command] },
            { no: 2, name: "matchId", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 3, name: "type", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 4, name: "identifier", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<SubscribeTgOdds>): SubscribeTgOdds {
        const message = { command: 0, matchId: 0, type: false, identifier: "" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<SubscribeTgOdds>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: SubscribeTgOdds): SubscribeTgOdds {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* socketProtos.command.Command command */ 1:
                    message.command = reader.int32();
                    break;
                case /* int32 matchId */ 2:
                    message.matchId = reader.int32();
                    break;
                case /* bool type */ 3:
                    message.type = reader.bool();
                    break;
                case /* string identifier */ 4:
                    message.identifier = reader.string();
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
    internalBinaryWrite(message: SubscribeTgOdds, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* socketProtos.command.Command command = 1; */
        if (message.command !== 0)
            writer.tag(1, WireType.Varint).int32(message.command);
        /* int32 matchId = 2; */
        if (message.matchId !== 0)
            writer.tag(2, WireType.Varint).int32(message.matchId);
        /* bool type = 3; */
        if (message.type !== false)
            writer.tag(3, WireType.Varint).bool(message.type);
        /* string identifier = 4; */
        if (message.identifier !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.identifier);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message socketProtos.SubscribeInfo.SubscribeTgOdds
 */
export const SubscribeTgOdds = new SubscribeTgOdds$Type();
