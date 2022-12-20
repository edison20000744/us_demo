# @us/proto

## 更新方法

1. 從https://usdev.k33uc.com/doc/protos/protos.7z 下載最新.proto檔，覆蓋到packages/proto/protobuf/protos
2. 根據需要在此目錄執行`npm run api`, `npm run socket`, `npm run chat`，為.proto檔生成對應.ts檔
3. 如果有新增或減少檔案，需要修改此目錄的`src/api.ts`, `src/chat.ts`, `src/socket.ts` exports
