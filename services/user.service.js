import { User } from "../models/user.model.js";

export class StudentService{

    async list(){return User.find()};
    async getById(id){return User.findById(id)};
    async create(dto){return User.create(dto)};
    async update(id, dto){return User.findByIdAndUpdate(id, dto, {new: true})};
    async delete(id){ return !!(await User.findByIdAndDelete(id))}

}