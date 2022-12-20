// @generated by protobuf-ts 2.5.0
// @generated from protobuf file "protobuf/protos/api/members/LoginLivestraming.proto" (package "ApiProtos.Members.Login", syntax proto3)
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
 * @generated from protobuf message ApiProtos.Members.Login.LoginLivestraming
 */
export interface LoginLivestraming {
    /**
     * @generated from protobuf field: string nickname = 3;
     */
    nickname: string; // 會員暱稱
    /**
     * @generated from protobuf field: string token = 2;
     */
    token: string; // 登入token
}
// @generated message type with reflection information, may provide speed optimized methods
class LoginLivestraming$Type extends MessageType<LoginLivestraming> {
    constructor() {
        super("ApiProtos.Members.Login.LoginLivestraming", [
            { no: 3, name: "nickname", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "token", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<LoginLivestraming>): LoginLivestraming {
        const message = { nickname: "", token: "" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<LoginLivestraming>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: LoginLivestraming): LoginLivestraming {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string nickname */ 3:
                    message.nickname = reader.string();
                    break;
                case /* string token */ 2:
                    message.token = reader.string();
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
    internalBinaryWrite(message: LoginLivestraming, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string nickname = 3; */
        if (message.nickname !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.nickname);
        /* string token = 2; */
        if (message.token !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.token);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message ApiProtos.Members.Login.LoginLivestraming
 */
export const LoginLivestraming = new LoginLivestraming$Type();