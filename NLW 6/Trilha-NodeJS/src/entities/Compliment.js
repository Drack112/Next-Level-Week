"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.Compliment = void 0;
var typeorm_1 = require("typeorm");
var uuid_1 = require("uuid");
var Tag_1 = require("./Tag");
var User_1 = require("./User");
var Compliment = /** @class */ (function () {
  function Compliment() {
    if (!this.id) {
      this.id = (0, uuid_1.v4)();
    }
  }
  __decorate(
    [(0, typeorm_1.PrimaryColumn)(), __metadata("design:type", String)],
    Compliment.prototype,
    "id",
    void 0,
  );
  __decorate(
    [(0, typeorm_1.Column)(), __metadata("design:type", String)],
    Compliment.prototype,
    "user_sender",
    void 0,
  );
  __decorate(
    [
      (0, typeorm_1.JoinColumn)({ name: "user_sender" }),
      (0, typeorm_1.ManyToOne)(function () {
        return User_1.User;
      }),
      __metadata("design:type", User_1.User),
    ],
    Compliment.prototype,
    "userSender",
    void 0,
  );
  __decorate(
    [(0, typeorm_1.Column)(), __metadata("design:type", String)],
    Compliment.prototype,
    "user_receiver",
    void 0,
  );
  __decorate(
    [
      (0, typeorm_1.JoinColumn)({ name: "user_receiver" }),
      (0, typeorm_1.ManyToOne)(function () {
        return User_1.User;
      }),
      __metadata("design:type", User_1.User),
    ],
    Compliment.prototype,
    "userReceiver",
    void 0,
  );
  __decorate(
    [(0, typeorm_1.Column)(), __metadata("design:type", String)],
    Compliment.prototype,
    "tag_id",
    void 0,
  );
  __decorate(
    [
      (0, typeorm_1.JoinColumn)({ name: "tag_id" }),
      (0, typeorm_1.ManyToOne)(function () {
        return Tag_1.Tag;
      }),
      __metadata("design:type", Tag_1.Tag),
    ],
    Compliment.prototype,
    "tag",
    void 0,
  );
  __decorate(
    [(0, typeorm_1.Column)(), __metadata("design:type", String)],
    Compliment.prototype,
    "message",
    void 0,
  );
  __decorate(
    [(0, typeorm_1.CreateDateColumn)(), __metadata("design:type", Date)],
    Compliment.prototype,
    "created_at",
    void 0,
  );
  Compliment = __decorate(
    [(0, typeorm_1.Entity)("compliments"), __metadata("design:paramtypes", [])],
    Compliment,
  );
  return Compliment;
})();
exports.Compliment = Compliment;
