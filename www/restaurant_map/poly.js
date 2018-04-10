
/**
 * @description 回转数法判断点是否在多边形内部
 * @param {Object} p 待判断的点，格式：{ x: X 坐标, y: Y 坐标 }
 * @param {Array} poly 多边形顶点，数组成员的格式同 p
 * @return {String} 点 p 和多边形 poly 的几何关系
 */
function windingNumber(p, poly) {
  var px = p.x,
      py = p.y,
      sum = 0

  for(var i = 0, l = poly.length, j = l - 1; i < l; j = i, i++) {
    var sx = poly[i].x,
        sy = poly[i].y,
        tx = poly[j].x,
        ty = poly[j].y

    // 点与多边形顶点重合或在多边形的边上
    if( (sx - px) * (px - tx) >= 0 && 
        (sy - py) * (py - ty) >= 0 && 
        (px - sx) * (ty - sy) === (py - sy) * (tx - sx)
      ) {
        return 'on'
    }

    // 点与相邻顶点连线的夹角
    var angle = Math.atan2(sy - py, sx - px) - Math.atan2(ty - py, tx - px)

    // 确保夹角不超出取值范围（-π 到 π）
    if(angle >= Math.PI) {
      angle = angle - Math.PI * 2
    } else if(angle <= -Math.PI) {
      angle = angle + Math.PI * 2
    }

    sum += angle
  }

  // 计算回转数并判断点和多边形的几何关系
  return Math.round(sum / Math.PI) === 0 ? 'out' : 'in'
}