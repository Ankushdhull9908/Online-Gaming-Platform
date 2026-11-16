
import cloudinary from "../config/cloudinary.js";
import player from "../models/PlayerSchema.js";

function uploadToCloudinary(buffer) {
    return new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(
            {
                folder: 'gamehub/profiles',
                resource_type: 'image'
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );

        stream.end(buffer);
    });
}

export async function uploadProfile(req, res) {
    try {

        if (!req.file) {
            return res.status(400).json({
                message: 'Please select an image'
            });
        }

        const result = await uploadToCloudinary(req.file.buffer);

        const user = await player.findOneAndUpdate(
            { _id: req.user.data.id },
            { $set: { playerprofile: result.secure_url } },
            { returnDocument: 'after' }
        );

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        return res.status(200).json({
            message: 'Profile picture updated successfully',
            imageUrl: user.playerprofile
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: 'Profile picture upload failed'
        });
    }
}
