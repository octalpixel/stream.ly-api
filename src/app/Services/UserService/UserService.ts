import { KDService } from "../../../app.core.config"
import { userModel as User, IUser, userModel } from "../../Models/User"
import { Document } from "mongoose"
import * as moment from 'moment'
import * as jwt from 'jsonwebtoken';

export class UserService extends KDService {

    constructor() {
        super()
        super.setModel(User)
    }

    async hasUser(params: Object) {

        try {

            let hasUser = await super.getOneByCondition(params)
            // console.log(hasUser)
            return hasUser;

        } catch (err) {
            return { success: false }
        }


    }

    async getUserById(id: string) {
        try {
            return await this.getOne(id)
        } catch (error) {
            return { success: false, msg: "User Not Found" }
        }
    }


    async createUser(user: IUser) {

        try {
            let createdUser = await super.create(user)

            if (createdUser.success) {
                createdUser.data = (<Document>createdUser.data).toJSON()
            }
            return createdUser

        } catch (err) {
            console.log(err.message)
            return { success: false, msg: "admin" }
        }

    }

    async getToken(user_id) {
        // console.log('This is the user given', user)
        try {
            let user = await userModel.findById(user_id)
            let userData = user.toJSON() as IUser;
            userData['role'] = 'user';
            userData['id'] = userData._id;
            let expireDate = moment().utc().add({ days: 7 }).unix()
            let token = jwt.sign({
                exp: expireDate,
                payload: userData
            }, "mithushan")

            return token;

        } catch (ex) {

            return null;
        }

    }



}

export const userService = new UserService()