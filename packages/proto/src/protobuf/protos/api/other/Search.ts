// @generated by protobuf-ts 2.5.0
// @generated from protobuf file "protobuf/protos/api/other/Search.proto" (package "ApiProtos.Other.Search", syntax proto3)
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
 * @generated from protobuf message ApiProtos.Other.Search.Search
 */
export interface Search {
    /**
     * @generated from protobuf field: repeated ApiProtos.Other.Search.Search.League leagues = 1;
     */
    leagues: Search_League[]; // 聯盟列表
    /**
     * @generated from protobuf field: repeated ApiProtos.Other.Search.Search.Team teams = 2;
     */
    teams: Search_Team[]; // 球隊列表
    /**
     * @generated from protobuf field: repeated ApiProtos.Other.Search.Search.Player players = 3;
     */
    players: Search_Player[]; // 球員列表
    /**
     * @generated from protobuf field: repeated ApiProtos.Other.Search.Search.NewsData news = 4;
     */
    news: Search_NewsData[]; // 新聞列表
}
/**
 * @generated from protobuf message ApiProtos.Other.Search.Search.League
 */
export interface Search_League {
    /**
     * @generated from protobuf field: int32 id = 1;
     */
    id: number; // 聯盟id
    /**
     * @generated from protobuf field: string name = 2;
     */
    name: string; // 聯盟名稱
    /**
     * @generated from protobuf field: string logo = 3;
     */
    logo: string; // 聯盟logo
    /**
     * @generated from protobuf field: int32 countryId = 4;
     */
    countryId: number; // 國家id
    /**
     * @generated from protobuf field: string countryName = 5;
     */
    countryName: string; // 國家名稱
    /**
     * @generated from protobuf field: string countryLogo = 6;
     */
    countryLogo: string; // 國家logo
}
/**
 * @generated from protobuf message ApiProtos.Other.Search.Search.Team
 */
export interface Search_Team {
    /**
     * @generated from protobuf field: int32 id = 1;
     */
    id: number; // 隊伍id
    /**
     * @generated from protobuf field: string name = 2;
     */
    name: string; // 隊伍名稱
    /**
     * @generated from protobuf field: string logo = 3;
     */
    logo: string; // 隊伍logo
    /**
     * @generated from protobuf field: int32 leagueId = 4;
     */
    leagueId: number; // 聯盟id
    /**
     * @generated from protobuf field: string leagueName = 5;
     */
    leagueName: string; // 聯盟名稱
    /**
     * @generated from protobuf field: string leagueLogo = 6;
     */
    leagueLogo: string; // 聯盟logo
}
/**
 * @generated from protobuf message ApiProtos.Other.Search.Search.Player
 */
export interface Search_Player {
    /**
     * @generated from protobuf field: int32 id = 1;
     */
    id: number; // 球員id
    /**
     * @generated from protobuf field: string name = 2;
     */
    name: string; // 球員名稱
    /**
     * @generated from protobuf field: string logo = 3;
     */
    logo: string; // 球員logo
    /**
     * @generated from protobuf field: string teamName = 4;
     */
    teamName: string; // 隊伍名稱
    /**
     * @generated from protobuf field: string teamLogo = 5;
     */
    teamLogo: string; // 隊伍logo
    /**
     * @generated from protobuf field: int32 teamId = 6;
     */
    teamId: number; // 隊伍id
    /**
     * @generated from protobuf field: string position = 7;
     */
    position: string; // 擅长位置 F-前锋 M-中场 D-后卫 G-守门员 ''-未知
}
/**
 * @generated from protobuf message ApiProtos.Other.Search.Search.NewsData
 */
export interface Search_NewsData {
    /**
     * @generated from protobuf field: int32 id = 1;
     */
    id: number; // 新聞ID
    /**
     * @generated from protobuf field: string title = 2;
     */
    title: string; // 新聞標題
    /**
     * @generated from protobuf field: string time = 3;
     */
    time: string; // 發布時間
    /**
     * @generated from protobuf field: string imgSrc = 4;
     */
    imgSrc: string; // 新聞圖片
    /**
     * @generated from protobuf field: string briefDescription = 5;
     */
    briefDescription: string; // 內容簡述
}
// @generated message type with reflection information, may provide speed optimized methods
class Search$Type extends MessageType<Search> {
    constructor() {
        super("ApiProtos.Other.Search.Search", [
            { no: 1, name: "leagues", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Search_League },
            { no: 2, name: "teams", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Search_Team },
            { no: 3, name: "players", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Search_Player },
            { no: 4, name: "news", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Search_NewsData }
        ]);
    }
    create(value?: PartialMessage<Search>): Search {
        const message = { leagues: [], teams: [], players: [], news: [] };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<Search>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Search): Search {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated ApiProtos.Other.Search.Search.League leagues */ 1:
                    message.leagues.push(Search_League.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case /* repeated ApiProtos.Other.Search.Search.Team teams */ 2:
                    message.teams.push(Search_Team.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case /* repeated ApiProtos.Other.Search.Search.Player players */ 3:
                    message.players.push(Search_Player.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case /* repeated ApiProtos.Other.Search.Search.NewsData news */ 4:
                    message.news.push(Search_NewsData.internalBinaryRead(reader, reader.uint32(), options));
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
    internalBinaryWrite(message: Search, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* repeated ApiProtos.Other.Search.Search.League leagues = 1; */
        for (let i = 0; i < message.leagues.length; i++)
            Search_League.internalBinaryWrite(message.leagues[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* repeated ApiProtos.Other.Search.Search.Team teams = 2; */
        for (let i = 0; i < message.teams.length; i++)
            Search_Team.internalBinaryWrite(message.teams[i], writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        /* repeated ApiProtos.Other.Search.Search.Player players = 3; */
        for (let i = 0; i < message.players.length; i++)
            Search_Player.internalBinaryWrite(message.players[i], writer.tag(3, WireType.LengthDelimited).fork(), options).join();
        /* repeated ApiProtos.Other.Search.Search.NewsData news = 4; */
        for (let i = 0; i < message.news.length; i++)
            Search_NewsData.internalBinaryWrite(message.news[i], writer.tag(4, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message ApiProtos.Other.Search.Search
 */
export const Search = new Search$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Search_League$Type extends MessageType<Search_League> {
    constructor() {
        super("ApiProtos.Other.Search.Search.League", [
            { no: 1, name: "id", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "logo", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "countryId", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 5, name: "countryName", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 6, name: "countryLogo", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<Search_League>): Search_League {
        const message = { id: 0, name: "", logo: "", countryId: 0, countryName: "", countryLogo: "" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<Search_League>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Search_League): Search_League {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* int32 id */ 1:
                    message.id = reader.int32();
                    break;
                case /* string name */ 2:
                    message.name = reader.string();
                    break;
                case /* string logo */ 3:
                    message.logo = reader.string();
                    break;
                case /* int32 countryId */ 4:
                    message.countryId = reader.int32();
                    break;
                case /* string countryName */ 5:
                    message.countryName = reader.string();
                    break;
                case /* string countryLogo */ 6:
                    message.countryLogo = reader.string();
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
    internalBinaryWrite(message: Search_League, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* int32 id = 1; */
        if (message.id !== 0)
            writer.tag(1, WireType.Varint).int32(message.id);
        /* string name = 2; */
        if (message.name !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.name);
        /* string logo = 3; */
        if (message.logo !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.logo);
        /* int32 countryId = 4; */
        if (message.countryId !== 0)
            writer.tag(4, WireType.Varint).int32(message.countryId);
        /* string countryName = 5; */
        if (message.countryName !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.countryName);
        /* string countryLogo = 6; */
        if (message.countryLogo !== "")
            writer.tag(6, WireType.LengthDelimited).string(message.countryLogo);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message ApiProtos.Other.Search.Search.League
 */
export const Search_League = new Search_League$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Search_Team$Type extends MessageType<Search_Team> {
    constructor() {
        super("ApiProtos.Other.Search.Search.Team", [
            { no: 1, name: "id", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "logo", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "leagueId", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 5, name: "leagueName", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 6, name: "leagueLogo", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<Search_Team>): Search_Team {
        const message = { id: 0, name: "", logo: "", leagueId: 0, leagueName: "", leagueLogo: "" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<Search_Team>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Search_Team): Search_Team {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* int32 id */ 1:
                    message.id = reader.int32();
                    break;
                case /* string name */ 2:
                    message.name = reader.string();
                    break;
                case /* string logo */ 3:
                    message.logo = reader.string();
                    break;
                case /* int32 leagueId */ 4:
                    message.leagueId = reader.int32();
                    break;
                case /* string leagueName */ 5:
                    message.leagueName = reader.string();
                    break;
                case /* string leagueLogo */ 6:
                    message.leagueLogo = reader.string();
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
    internalBinaryWrite(message: Search_Team, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* int32 id = 1; */
        if (message.id !== 0)
            writer.tag(1, WireType.Varint).int32(message.id);
        /* string name = 2; */
        if (message.name !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.name);
        /* string logo = 3; */
        if (message.logo !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.logo);
        /* int32 leagueId = 4; */
        if (message.leagueId !== 0)
            writer.tag(4, WireType.Varint).int32(message.leagueId);
        /* string leagueName = 5; */
        if (message.leagueName !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.leagueName);
        /* string leagueLogo = 6; */
        if (message.leagueLogo !== "")
            writer.tag(6, WireType.LengthDelimited).string(message.leagueLogo);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message ApiProtos.Other.Search.Search.Team
 */
export const Search_Team = new Search_Team$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Search_Player$Type extends MessageType<Search_Player> {
    constructor() {
        super("ApiProtos.Other.Search.Search.Player", [
            { no: 1, name: "id", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "logo", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "teamName", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "teamLogo", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 6, name: "teamId", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 7, name: "position", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<Search_Player>): Search_Player {
        const message = { id: 0, name: "", logo: "", teamName: "", teamLogo: "", teamId: 0, position: "" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<Search_Player>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Search_Player): Search_Player {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* int32 id */ 1:
                    message.id = reader.int32();
                    break;
                case /* string name */ 2:
                    message.name = reader.string();
                    break;
                case /* string logo */ 3:
                    message.logo = reader.string();
                    break;
                case /* string teamName */ 4:
                    message.teamName = reader.string();
                    break;
                case /* string teamLogo */ 5:
                    message.teamLogo = reader.string();
                    break;
                case /* int32 teamId */ 6:
                    message.teamId = reader.int32();
                    break;
                case /* string position */ 7:
                    message.position = reader.string();
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
    internalBinaryWrite(message: Search_Player, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* int32 id = 1; */
        if (message.id !== 0)
            writer.tag(1, WireType.Varint).int32(message.id);
        /* string name = 2; */
        if (message.name !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.name);
        /* string logo = 3; */
        if (message.logo !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.logo);
        /* string teamName = 4; */
        if (message.teamName !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.teamName);
        /* string teamLogo = 5; */
        if (message.teamLogo !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.teamLogo);
        /* int32 teamId = 6; */
        if (message.teamId !== 0)
            writer.tag(6, WireType.Varint).int32(message.teamId);
        /* string position = 7; */
        if (message.position !== "")
            writer.tag(7, WireType.LengthDelimited).string(message.position);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message ApiProtos.Other.Search.Search.Player
 */
export const Search_Player = new Search_Player$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Search_NewsData$Type extends MessageType<Search_NewsData> {
    constructor() {
        super("ApiProtos.Other.Search.Search.NewsData", [
            { no: 1, name: "id", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "title", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "time", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "imgSrc", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "briefDescription", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<Search_NewsData>): Search_NewsData {
        const message = { id: 0, title: "", time: "", imgSrc: "", briefDescription: "" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<Search_NewsData>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Search_NewsData): Search_NewsData {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* int32 id */ 1:
                    message.id = reader.int32();
                    break;
                case /* string title */ 2:
                    message.title = reader.string();
                    break;
                case /* string time */ 3:
                    message.time = reader.string();
                    break;
                case /* string imgSrc */ 4:
                    message.imgSrc = reader.string();
                    break;
                case /* string briefDescription */ 5:
                    message.briefDescription = reader.string();
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
    internalBinaryWrite(message: Search_NewsData, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* int32 id = 1; */
        if (message.id !== 0)
            writer.tag(1, WireType.Varint).int32(message.id);
        /* string title = 2; */
        if (message.title !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.title);
        /* string time = 3; */
        if (message.time !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.time);
        /* string imgSrc = 4; */
        if (message.imgSrc !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.imgSrc);
        /* string briefDescription = 5; */
        if (message.briefDescription !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.briefDescription);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message ApiProtos.Other.Search.Search.NewsData
 */
export const Search_NewsData = new Search_NewsData$Type();
