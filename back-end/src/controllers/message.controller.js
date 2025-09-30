import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.lib.js";

export const getUsersForSidebar = async(req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const filteredUser = await User.find({ _id: {$ne: loggedInUserId} }).select('-password');

        res.status(200).json(filteredUser);

    } catch (error) {
        console.log('Error in getUsersForSidebar: ', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const getMessages = async(req, res) => {
    try {
        const {id: userToChatId} = req.params;
        const myId = req.user._id;

        const Messages = await Message.find({
            $or: [
                {senderId: myId, receiverId: userToChatId},
                {senderId: userToChatId, receiverId: myId}
            ]
        });

        res.status(200).json(Messages);

    } catch (error) {
        console.log('Error in getMessages function', error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const sendMessage = async(req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url
        }

        const newMessage = new Message({
            senderId: senderId,
            receiverId: receiverId,
            text: text,
            image: imageUrl
        });

        await newMessage.save();

        // todo: realtime functionality will be implemented here with socket.io

        res.status(201).json(newMessage);

    } catch (error) {
        console.log('Error in sendMessage controller', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

