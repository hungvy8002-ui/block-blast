// checkBlocks.js
export function onCheckBlocks(ctx) {
    var t = ctx.view.block_map,
        o = c.control.block_size,
        e = !0,
        n = [];

    ctx.fs_list = [];
    ctx.bingo_i = [];
    ctx.bingo_j = [];

    for (var i = 0; i < ctx.toy_node.children.length; i++) {
        for (var r = !1, s = 0; s < t.length; s++)
            for (var a = 0; a < t[0].length; a++) {
                var h = t[s][a];
                if (h.getOpacity() < 255) h.setOpacity(0);
                h.setColor(h.ori_color_num);
                if (e) {
                    var l = h.node.convertToNodeSpaceAR(
                        ctx.toy_node.children[i].convertToWorldSpaceAR(cc.v2(0, 0))
                    );
                    if (l.x >= -o / 2 && l.x < o / 2 && l.y >= -o / 2 && l.y < o / 2) {
                        if (!h.getOpacity()) r = !0;
                        n.push(h);
                    }
                }
            }
        if (!r) e = !1;
    }

    if (e) {
        var p = [],
            u = [];
        for (s = 0; s < n.length; s++) {
            var h = n[s];
            if (!h.getOpacity()) {
                h.setColor(ctx.color_idx);
                h.setOpacity(127);
                ctx.fs_list.push(h);
            }
        }

        for (var _ = 0; _ < n.length; _++) {
            var d = n[_];
            s = d.i;
            a = d.j;

            // --- DÒNG NGANG ---
            if (-1 === p.indexOf(s)) {
                p.push(s);
                var f = !0;
                for (var y = 0; y < t[s].length; y++)
                    if (t[s][y].getOpacity() <= 0) f = !1;
                if (f) {
                    ctx.bingo_i.push(s);
                    for (var v = 0; v < t[s].length; v++) {
                        t[s][v].setColor(ctx.color_idx);
                        var glowIntensity = 1.5;
                        t[s][v].addGlow(ctx.color_idx, glowIntensity);
                    }
                }
            }

            // --- CỘT DỌC ---
            if (-1 === u.indexOf(a)) {
                u.push(a);
                f = !0;
                for (var g = 0; g < t.length; g++)
                    if (t[g][a].getOpacity() <= 0) f = !1;
                if (f) {
                    ctx.bingo_j.push(a);
                    for (var b = 0; b < t.length; b++) {
                        t[b][a].setColor(ctx.color_idx);
                        t[b][a].setOpacity(150);
                    }
                }
            }
        }
    }
}
