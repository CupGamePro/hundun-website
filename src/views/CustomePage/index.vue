<template>
  <div class="row">
    <el-scrollbar wrap-style="height: calc(100vh - 48px)">
      <div class="col-3 block-menu">
        <el-space direction="vertical">
          <div class="list-group-item-menu" @drag="drag(element)" v-for="element in list1" :key="element.id"
            @dragend="dragend(element)" draggable="true" unselectable="on">
            {{ element.name }}
          </div>
        </el-space>
      </div>

    </el-scrollbar>

    <div id="content" class="content">
      <grid-layout ref="gridlayout" v-model:layout="layout" :col-num="12" :row-height="30" :is-draggable="true"
        :is-resizable="true" :vertical-compact="true" :use-css-transforms="true">
        <grid-item :key="item.i" v-for="item in layout" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i">
          <el-button type="primary" v-if="item.i === 'button'">Primary</el-button>
          <el-table :data="tableData" v-if="item.i === 'table'">
            <el-table-column prop="date" label="Date" width="180" />
            <el-table-column prop="name" label="Name" width="180" />
            <el-table-column prop="address" label="Address" />
          </el-table>
        </grid-item>
      </grid-layout>
    </div>
  </div>
</template>

<script>
import { GridLayout, GridItem } from "vue-grid-layout"
let mouseXY = { "x": null, "y": null };
let DragPos = { "x": null, "y": null, "w": 1, "h": 1, "i": null };
export default {
  name: "custom-clone",
  components: {
    GridLayout,
    GridItem
  },
  data () {
    return {
      list1: [
        {
          "name": "table",
          "id": 1
        },
        {
          "name": "button",
          "id": 0
        },
        {
          "name": "Jean",
          "id": 2
        }
      ],
      layout: [],
      formLabelAlign: {
        name: '',
        region: '',
        type: '',
      },
      tableData: [
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
      ]
    };
  },
  mounted () {
    document.addEventListener("dragover", function (e) {
      mouseXY.x = e.clientX;
      mouseXY.y = e.clientY;
    }, false);
  },
  methods: {
    drag: function (e) {
      let parentRect = document.getElementById('content').getBoundingClientRect();
      let mouseInGrid = false;
      if (((mouseXY.x > parentRect.left) && (mouseXY.x < parentRect.right)) && ((mouseXY.y > parentRect.top) && (mouseXY.y < parentRect.bottom))) {
        mouseInGrid = true;
      }
      if (mouseInGrid === true && (this.layout.findIndex(item => item.i === e.name)) === -1) {
        this.layout.push({
          x: (this.layout.length * 2) % 12,
          y: this.layout.length + 12, // puts it at the bottom
          w: 1,
          h: 1,
          i: e.name,
        });
      }
      let index = this.layout.findIndex(item => item.i === e.name);
      console.log(index);
      if (index !== -1) {
        try {
          this.$refs.gridlayout.$children[this.layout.length].$refs.item.style.display = "none";
        } catch {
          console.log(222);
        }
        let el = this.$refs.gridlayout.$children[index];
        el.dragging = { "top": mouseXY.y - parentRect.top, "left": mouseXY.x - parentRect.left };
        let new_pos = el.calcXY(mouseXY.y - parentRect.top, mouseXY.x - parentRect.left);
        if (mouseInGrid === true) {
          this.$refs.gridlayout.dragEvent('dragstart', e.name, new_pos.x, new_pos.y, 1, 1);
          DragPos.i = String(index);
          DragPos.x = this.layout[index].x;
          DragPos.y = this.layout[index].y;
        }
        if (mouseInGrid === false) {
          this.$refs.gridlayout.dragEvent('dragend', e.name, new_pos.x, new_pos.y, 1, 1);
          this.layout = this.layout.filter(obj => obj.i !== e.name);
        }
      }
    },
    dragend: function (e) {
      let parentRect = document.getElementById('content').getBoundingClientRect();
      let mouseInGrid = false;
      if (((mouseXY.x > parentRect.left) && (mouseXY.x < parentRect.right)) && ((mouseXY.y > parentRect.top) && (mouseXY.y < parentRect.bottom))) {
        mouseInGrid = true;
      }
      if (mouseInGrid === true) {
        this.$refs.gridlayout.dragEvent('dragend', e.name, DragPos.x, DragPos.y, 1, 1);
        this.layout = this.layout.filter(obj => obj.i !== e.name);
        // UNCOMMENT below if you want to add a grid-item
        this.layout.push({
          x: DragPos.x,
          y: DragPos.y,
          w: 1,
          h: 1,
          i: e.name,
        });
        this.$refs.gridLayout.dragEvent('dragend', DragPos.i, DragPos.x, DragPos.y, 1, 1);
        try {
          this.$refs.gridlayout.$children[this.layout.length].$refs.item.style.display = "block";
        } catch {
          console.log(111);
        }
      }
    },
  }
};
</script>
<style scoped>
.row {
  display: flex;
  box-sizing: border-box;
  height: 100%;
}
.col-3 {
  box-sizing: border-box;
  background-color: #ffffff;
  padding: 20px;
  height: calc(100vh - 48px);
}
.content {
  box-sizing: border-box;
  width: calc(100% - 240px);
  margin: 15px;
  padding: 15px;
  background-color: #ffffff;
}
.dragArea {
  height: 100%;
  width: 100%;
}
.block-menu {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.list-group-item-menu {
  height: 150px;
  width: 180px;
  line-height: 150px;
  text-align: center;
  background: var(--el-color-primary-light-5);
  border-radius: 10px;
  cursor: pointer;
}
.list-group-item-menu:hover {
  box-shadow: var(--el-box-shadow);
}
</style>