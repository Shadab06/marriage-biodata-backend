import User from "../models/user.js";

export const signup = async (req, res) => {
    const { name, email, mobile, password } = req.body;

    try {
        const existingUser = await User.findOne({ email })

        if (existingUser) return res.status(409).json({ message: "User already exists." })

        const result = await User.create({ name, email, mobile, password })
        res.status(201).json(result)
    } catch (error) {
        res.status(422).json({ error: error.message })
    }
}

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email })

        if (!existingUser) return res.status(404).json({ message: "User not found shdhkjghsd" })
        if (existingUser) {
            if (existingUser.authenticate(password)) {
                // const token = jwt.sign({ id: existingUser._Id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                let userDetail = {
                    id: existingUser._id,
                    name: existingUser.name,
                    email: existingUser.email
                }
                return res.status(200).json(userDetail);
            } else return res.status(406).json({ message: "Incorrect credentials" })
        }
    } catch (error) {
        res.status(422).json({ message: error.message });
    }
}