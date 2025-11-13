o.prototype.onCheckBlocks = function() {
    var t = this.view.block_map;        // mảng 2D [row][col] block
    var o = c.control.block_size;       // kích thước block
    var allFit = true;                  // flag kiểm tra toy_node chạm đúng vị trí
    var n = [];                          // danh sách block trúng toy_node

    this.fs_list = [];
    this.bingo_i = [];                   // hàng bingo
    this.bingo_j = [];                   // cột bingo

    // --- 1. Lọc các block trúng toy_node ---
    for (var i = 0; i < this.toy_node.children.length; i++) {
        var blockHit = false;
        for (var row = 0; row < t.length; row++) {
            for (var col = 0; col < t[0].length; col++) {
                var block = t[row][col];
                if (block.getOpacity() < 255) block.setOpacity(0);
                block.setColor(block.ori_color_num);
                
                if (allFit) {
                    var pos = block.node.convertToNodeSpaceAR(
                        this.toy_node.children[i].convertToWorldSpaceAR(cc.v2(0, 0))
                    );
                    if (pos.x >= -o/2 && pos.x < o/2 && pos.y >= -o/2 && pos.y < o/2) {
                        if (!block.getOpacity()) blockHit = true;
                        n.push(block);
                    }
                }
            }
        }
        if (!blockHit) allFit = false;
    }

    if (!allFit) return; // nếu không tất cả toy_node đúng vị trí thì thôi

    // --- 2. Chuẩn bị các cột/hàng đã xử lý ---
    var processedRows = [];
    var processedCols = [];
    
    // --- 3. Xử lý từng block trong danh sách n ---
    for (var idx = 0; idx < n.length; idx++) {
        var block = n[idx];

        // đánh dấu block chưa xử lý bingo
        if (block.processed === undefined) block.processed = false;

        var row = block.i;
        var col = block.j;

        // --- Row bingo ---
        if (processedRows.indexOf(row) === -1) {
            processedRows.push(row);
            var rowBingo = true;
            for (var c = 0; c < t[row].length; c++) {
                if (t[row][c].getOpacity() <= 0) {
                    rowBingo = false;
                    break;
                }
            }
            if (rowBingo) {
                this.bingo_i.push(row);
                for (var c = 0; c < t[row].length; c++) {
                    var b = t[row][c];
                    if (!b.processed) {
                        b.setColor(this.color_idx);
                        b.setOpacity(127);
                        b.addGlow(this.color_idx, 1.5);
                        this.fs_list.push(b);
                        b.processed = true;
                    }
                }
            }
        }

        // --- Column bingo ---
        if (processedCols.indexOf(col) === -1) {
            processedCols.push(col);
            var colBingo = true;
            for (var r = 0; r < t.length; r++) {
                if (t[r][col].getOpacity() <= 0) {
                    colBingo = false;
                    break;
                }
            }
            if (colBingo) {
                this.bingo_j.push(col);
                for (var r = 0; r < t.length; r++) {
                    var b = t[r][col];
                    if (!b.processed) {
                        b.setColor(this.color_idx);
                        b.setOpacity(127);
                        b.addGlow(this.color_idx, 1.5);
                        this.fs_list.push(b);
                        b.processed = true;
                    }
                }
            }
        }
    }
}
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
