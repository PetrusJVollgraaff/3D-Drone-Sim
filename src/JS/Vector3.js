class Vector3 {
  constructor({ x = 0, y = 0, z = 0 }) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  static fromOffsets(info) {
    return new Vector3({
      x: info.offsetX,
      y: info.offsetY,
      z: info.offsetZ || 0,
    });
  }

  static zero() {
    return new Vector3({});
  }

  static load(data) {
    return new Vector3(data);
  }

  static mid(vectors) {
    const minX = Math.min(...vectors.map((p) => p.x));
    const maxX = Math.max(...vectors.map((p) => p.x));

    const minY = Math.min(...vectors.map((p) => p.y));
    const maxY = Math.max(...vectors.map((p) => p.y));

    const minZ = Math.min(...vectors.map((p) => p.z));
    const maxZ = Math.max(...vectors.map((p) => p.z));

    return new Vector3({
      x: minX + (maxX - minX) / 2,
      y: minY + (maxY - minY) / 2,
      z: minZ + (maxZ - minZ) / 2,
    });
  }

  static add(v1, v2) {
    return v1.add(v2);
  }

  static subtract(v1, v2) {
    return v1.subtract(v2);
  }

  static magnitude(v) {
    return v.magnitude();
  }

  static scale(v, scalar) {
    return v.scale(scalar);
  }

  static min(v1, v2) {
    return v1.min(v2);
  }

  static max(v1, v2) {
    return v1.max(v2);
  }

  static dot(v1, v2) {
    return v1.dot(v2);
  }

  static cross(v1, v2) {
    return v1.cross(v2);
  }

  static distance(v1, v2) {
    return v1.subtract(v2).magnitude();
  }

  static topLeft(vectors) {
    let result = vectors[0];
    for (const v of vectors) result = result.min(v);
    return result;
  }

  static bottomRight(vectors) {
    let result = vectors[0];
    for (const v of vectors) result = result.max(v);
    return result;
  }

  // --- Instance Methods ---

  add(v) {
    return new Vector3({
      x: this.x + v.x,
      y: this.y + v.y,
      z: this.z + v.z,
    });
  }

  subtract(v) {
    return new Vector3({
      x: this.x - v.x,
      y: this.y - v.y,
      z: this.z - v.z,
    });
  }

  magnitude() {
    return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
  }

  scale(scalar) {
    return new Vector3({
      x: this.x * scalar,
      y: this.y * scalar,
      z: this.z * scalar,
    });
  }

  min(v) {
    return new Vector3({
      x: Math.min(this.x, v.x),
      y: Math.min(this.y, v.y),
      z: Math.min(this.z, v.z),
    });
  }

  max(v) {
    return new Vector3({
      x: Math.max(this.x, v.x),
      y: Math.max(this.y, v.y),
      z: Math.max(this.z, v.z),
    });
  }

  dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  cross(v) {
    return new Vector3({
      x: this.y * v.z - this.z * v.y,
      y: this.z * v.x - this.x * v.z,
      z: this.x * v.y - this.y * v.x,
    });
  }

  normalize() {
    const mag = this.magnitude();
    return mag === 0 ? Vector3.zero() : this.scale(1 / mag);
  }

  // --- Optional rotations (basic) ---

  rotateX(angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    return new Vector3({
      x: this.x,
      y: this.y * cos - this.z * sin,
      z: this.y * sin + this.z * cos,
    });
  }

  rotateY(angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    return new Vector3({
      x: this.x * cos + this.z * sin,
      y: this.y,
      z: -this.x * sin + this.z * cos,
    });
  }

  rotateZ(angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    return new Vector3({
      x: this.x * cos - this.y * sin,
      y: this.x * sin + this.y * cos,
      z: this.z,
    });
  }

  toArray() {
    return [this.x, this.y, this.z];
  }

  clone() {
    return new Vector3(this);
  }
}

export { Vector3 };
