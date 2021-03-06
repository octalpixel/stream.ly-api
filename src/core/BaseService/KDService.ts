import { Model, Document, Schema, Types } from "mongoose";
import KDIResponseData from "../BaseInterface/KDIResponseData";
import ResponseHelper from "../Helpers/ResponseHelper";
import { SecureClientSessionOptions } from "http2";
export default class KDService {
  model: Model<Document>;
  constructor() {
    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getOne = this.getOne.bind(this);
    this.update = this.update.bind(this);
  }

  public setModel(model: Model<Document>) {
    this.model = model;
  }

  async create(data: Object, populate?: { fields: string }) {
    try {
      let modelDocument: Document = new this.model(data);
      let createdData = await modelDocument.save();
      // console.log(createdData)
      return ResponseHelper.serviceSuccessResponse(createdData);
    } catch (ex) {
      console.log(ex);
      return ResponseHelper.serviceFailedResponse(
        `Internal Server Error. Failed to create ${this.model.modelName}`
      );
    }
  }

  async getAll() {
    try {
      let allData = await this.model.find();
      // console.log(allData);
      return ResponseHelper.serviceSuccessResponse(allData);
    } catch (ex) {
      //log the error
      console.log(ex.message);
      return ResponseHelper.serviceFailedResponse("Failed to get data");
    }
  }

  async getOneByCondition(params: Object) {
    try {
      let data = await this.model.findOne(params);
      console.log(data.id);

      if (data != null) {
        return ResponseHelper.serviceSuccessResponse(data);
      }

      return ResponseHelper.serviceFailedResponse("Not Found");
    } catch (ex) {
      console.log(ex.message);
      return ResponseHelper.serviceFailedResponse("Failed to get data");
    }
  }

  async getOne(id: Schema.Types.ObjectId | string) {
    try {
      let getOneData = await this.model.findOne({ _id: id });

      if (getOneData != null) {
        return ResponseHelper.serviceSuccessResponse(getOneData);
      }

      return ResponseHelper.serviceFailedResponse("Not Found");
    } catch (ex) {
      return ResponseHelper.serviceFailedResponse("Failed to get data");
    }
  }

  async update(id: Schema.Types.ObjectId | string, newData: Object) {
    try {
      let updateData = await this.model.findByIdAndUpdate(
        { _id: id },
        newData,
        { new: true }
      );

      if (updateData) {
        return ResponseHelper.serviceSuccessResponse(updateData);
      } else {
        return ResponseHelper.serviceFailedResponse(
          "Entry Not Found!! Unable to update entry"
        );
      }
    } catch (ex) {
      return ResponseHelper.serviceFailedResponse("Unable to Update Entry");
    }
  }

  async delete(id: Schema.Types.ObjectId | string) {
    try {
      let deleteStatus = await this.model.findByIdAndRemove({ _id: id });

      if (deleteStatus) {
        return ResponseHelper.serviceSuccessResponse("Deleted Entry");
      } else {
        return ResponseHelper.serviceFailedResponse(
          "Entry Not Found!! Unable to delete entry"
        );
      }
    } catch (ex) {
      return ResponseHelper.serviceFailedResponse("Unable to Delete Entry");
    }
  }
}
