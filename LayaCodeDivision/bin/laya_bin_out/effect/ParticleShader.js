//class laya.particle.shader.ParticleShader extends laya.webgl.shader.Shader
var ParticleShader=(function(_super){
	//TODO:coverage
	function ParticleShader(){
		ParticleShader.__super.call(this,ParticleShader.vs,ParticleShader.ps,"ParticleShader",null,['a_CornerTextureCoordinate',0,'a_Position',1,'a_Velocity',2,'a_StartColor',3,
		'a_EndColor',4,'a_SizeRotation',5,'a_Radius',6,'a_Radian',7,'a_AgeAddScale',8,'a_Time',9]);
	}

	__class(ParticleShader,'laya.particle.shader.ParticleShader',_super);
	__static(ParticleShader,
	['vs',function(){return this.vs="attribute vec4 a_CornerTextureCoordinate;\nattribute vec3 a_Position;\nattribute vec3 a_Velocity;\nattribute vec4 a_StartColor;\nattribute vec4 a_EndColor;\nattribute vec3 a_SizeRotation;\nattribute vec2 a_Radius;\nattribute vec4 a_Radian;\nattribute float a_AgeAddScale;\nattribute float a_Time;\n\nvarying vec4 v_Color;\nvarying vec2 v_TextureCoordinate;\n\nuniform float u_CurrentTime;\nuniform float u_Duration;\nuniform float u_EndVelocity;\nuniform vec3 u_Gravity;\n\nuniform vec2 size;\nuniform mat4 u_mmat;\n\nvec4 ComputeParticlePosition(in vec3 position, in vec3 velocity,in float age,in float normalizedAge)\n{\n\n   float startVelocity = length(velocity);//起始标量速度\n   float endVelocity = startVelocity * u_EndVelocity;//结束标量速度\n\n   float velocityIntegral = startVelocity * normalizedAge +(endVelocity - startVelocity) * normalizedAge *normalizedAge/2.0;//计算当前速度的标量（单位空间），vt=v0*t+(1/2)*a*(t^2)\n   \n   vec3 addPosition = normalize(velocity) * velocityIntegral * u_Duration;//计算受自身速度影响的位置，转换标量到矢量    \n   addPosition += u_Gravity * age * normalizedAge;//计算受重力影响的位置\n   \n   float radius=mix(a_Radius.x, a_Radius.y, normalizedAge); //计算粒子受半径和角度影响（无需计算角度和半径时，可用宏定义优化屏蔽此计算）\n   float radianHorizontal =mix(a_Radian.x,a_Radian.z,normalizedAge);\n   float radianVertical =mix(a_Radian.y,a_Radian.w,normalizedAge);\n   \n   float r =cos(radianVertical)* radius;\n   addPosition.y += sin(radianVertical) * radius;\n	\n   addPosition.x += cos(radianHorizontal) *r;\n   addPosition.z += sin(radianHorizontal) *r;\n  \n   addPosition.y=-addPosition.y;//2D粒子位置更新需要取负，2D粒子坐标系Y轴正向朝上\n   position+=addPosition;\n   return  vec4(position,1.0);\n}\n\nfloat ComputeParticleSize(in float startSize,in float endSize, in float normalizedAge)\n{    \n    float size = mix(startSize, endSize, normalizedAge);\n    return size;\n}\n\nmat2 ComputeParticleRotation(in float rot,in float age)\n{    \n    float rotation =rot * age;\n    //计算2x2旋转矩阵.\n    float c = cos(rotation);\n    float s = sin(rotation);\n    return mat2(c, -s, s, c);\n}\n\nvec4 ComputeParticleColor(in vec4 startColor,in vec4 endColor,in float normalizedAge)\n{\n	vec4 color=mix(startColor,endColor,normalizedAge);\n    //硬编码设置，使粒子淡入很快，淡出很慢,6.7的缩放因子把置归一在0到1之间，可以谷歌x*(1-x)*(1-x)*6.7的制图表\n    color.a *= normalizedAge * (1.0-normalizedAge) * (1.0-normalizedAge) * 6.7;\n   \n    return color;\n}\n\nvoid main()\n{\n   float age = u_CurrentTime - a_Time;\n   age *= 1.0 + a_AgeAddScale;\n   float normalizedAge = clamp(age / u_Duration,0.0,1.0);\n   gl_Position = ComputeParticlePosition(a_Position, a_Velocity, age, normalizedAge);//计算粒子位置\n   float pSize = ComputeParticleSize(a_SizeRotation.x,a_SizeRotation.y, normalizedAge);\n   mat2 rotation = ComputeParticleRotation(a_SizeRotation.z, age);\n	\n    mat4 mat=u_mmat;\n    gl_Position=vec4((mat*gl_Position).xy,0.0,1.0);\n    gl_Position.xy += (rotation*a_CornerTextureCoordinate.xy) * pSize*vec2(mat[0][0],mat[1][1]);\n    gl_Position=vec4((gl_Position.x/size.x-0.5)*2.0,(0.5-gl_Position.y/size.y)*2.0,0.0,1.0);\n   \n   v_Color = ComputeParticleColor(a_StartColor,a_EndColor, normalizedAge);\n   v_TextureCoordinate =a_CornerTextureCoordinate.zw;\n}\n\n";},'ps',function(){return this.ps="#ifdef FSHIGHPRECISION\nprecision highp float;\n#else\nprecision mediump float;\n#endif\n\nvarying vec4 v_Color;\nvarying vec2 v_TextureCoordinate;\nuniform sampler2D u_texture;\n\nvoid main()\n{	\n	gl_FragColor=texture2D(u_texture,v_TextureCoordinate)*v_Color;\n	gl_FragColor.xyz *= v_Color.w;\n}";}
	]);
	return ParticleShader;
})(Shader)



})(window,document,Laya);
