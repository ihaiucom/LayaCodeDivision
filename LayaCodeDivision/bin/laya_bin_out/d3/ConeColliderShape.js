/**
*<code>ConeColliderShape</code> 类用于创建圆柱碰撞器。
*/
//class laya.d3.physics.shape.ConeColliderShape extends laya.d3.physics.shape.ColliderShape
var ConeColliderShape=(function(_super){
	function ConeColliderShape(radius,height,orientation){
		/**@private */
		//this._orientation=0;
		/**@private */
		this._radius=1;
		/**@private */
		this._height=0.5;
		ConeColliderShape.__super.call(this);
		(radius===void 0)&& (radius=0.5);
		(height===void 0)&& (height=1.0);
		(orientation===void 0)&& (orientation=/*laya.d3.physics.shape.ColliderShape.SHAPEORIENTATION_UPY*/1);
		this._radius=radius;
		this._height=height;
		this._orientation=orientation;
		this._type=/*laya.d3.physics.shape.ColliderShape.SHAPETYPES_CYLINDER*/2;
		switch (orientation){
			case /*laya.d3.physics.shape.ColliderShape.SHAPEORIENTATION_UPX*/0:
				this._nativeShape=new Laya3D._physics3D.btConeShapeX(radius,height);
				break ;
			case /*laya.d3.physics.shape.ColliderShape.SHAPEORIENTATION_UPY*/1:
				this._nativeShape=new Laya3D._physics3D.btConeShape(radius,height);
				break ;
			case /*laya.d3.physics.shape.ColliderShape.SHAPEORIENTATION_UPZ*/2:
				this._nativeShape=new Laya3D._physics3D.btConeShapeZ(radius,height);
				break ;
			default :
				throw "ConeColliderShape:unknown orientation.";
			}
	}

	__class(ConeColliderShape,'laya.d3.physics.shape.ConeColliderShape',_super);
	var __proto=ConeColliderShape.prototype;
	/**
	*@inheritDoc
	*/
	__proto.clone=function(){
		var dest=new ConeColliderShape(this._radius,this._height,this._orientation);
		this.cloneTo(dest);
		return dest;
	}

	/**
	*获取半径。
	*/
	__getset(0,__proto,'radius',function(){
		return this._radius;
	});

	/**
	*获取高度。
	*/
	__getset(0,__proto,'height',function(){
		return this._height;
	});

	/**
	*获取方向。
	*/
	__getset(0,__proto,'orientation',function(){
		return this._orientation;
	});

	return ConeColliderShape;
})(ColliderShape)


/**
