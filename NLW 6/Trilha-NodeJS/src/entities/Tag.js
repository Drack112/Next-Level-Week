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
exports.Tag = void 0;
var typeorm_1 = require("typeorm");
var class_transformer_1 = require("class-transformer");
var uuid_1 = require("uuid");
var Tag = /** @class */ (function () {
  function Tag() {
    if (!this.id) {
      this.id = (0, uuid_1.v4)();
    }
  }
  Tag.prototype.nameCustom = function () {
    return "#".concat(this.name);
  };
  __decorate(
    [(0, typeorm_1.PrimaryColumn)(), __metadata("design:type", String)],
    Tag.prototype,
    "id",
    void 0,
  );
  __decorate(
    [(0, typeorm_1.Column)(), __metadata("design:type", String)],
    Tag.prototype,
    "name",
    void 0,
  );
  __decorate(
    [(0, typeorm_1.CreateDateColumn)(), __metadata("design:type", Date)],
    Tag.prototype,
    "created_at",
    void 0,
  );
  __decorate(
    [(0, typeorm_1.UpdateDateColumn)(), __metadata("design:type", Date)],
    Tag.prototype,
    "updated_at",
    void 0,
  );
  __decorate(
    [
      (0, class_transformer_1.Expose)({ name: "name_custom" }),
      __metadata("design:type", Function),
      __metadata("design:paramtypes", []),
      __metadata("design:returntype", String),
    ],
    Tag.prototype,
    "nameCustom",
    null,
  );
  Tag = __decorate(
    [(0, typeorm_1.Entity)("tags"), __metadata("design:paramtypes", [])],
    Tag,
  );
  return Tag;
})();
exports.Tag = Tag;
