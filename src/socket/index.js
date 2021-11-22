const {io} = require("../../server");
const isAuthMiddleware = require("./middlewares/is-auth");
const {emitters, listeners} = require("./utils/event-name");

// emiitter and listener actions imports
// const userConnect = require("./actions/user-connect");
// const userDisconnect = require("./actions/user-disconnect");
const chat = require("./actions/chat");
const userConnect = require("./actions/user-connect/index");
const userDisconnect = require("./actions/user-disconnect/index");

io.use(isAuthMiddleware);
io.on(listeners.rootIOConnect, (socket) => {
    socket.emit(emitters.userConnect, userConnect(socket));
    socket.on(listeners.userDisconnect, () => userDisconnect(socket));

    // for chat
    socket.on(listeners.createRoom, chat.createRoom(socket));
    socket.on(listeners.msgFromClient, chat.saveMessage(io, socket));
    socket.on(listeners.joinRoom, chat.joinRoom(socket));
    // socket.on(listeners.listRoomsForUser, chat.listRoomsForUser(socket));
    // socket.on(listeners.msgFromClient, chat.pushChatMsg(io, socket));
    // socket.on(listeners.joinRoom, chat.joinRoom(socket));
});
