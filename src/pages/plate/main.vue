<template>
  <div class="container">
    <div class="toolBox">
      <el-button type="danger" size="medium" @click="toggleSelection"
        ><i class="el-icon-plus"></i>新建</el-button
      >
      <el-button type="danger" size="medium" @click="clickUpload"
        ><i class="el-icon-upload"></i>上传</el-button
      >
      <el-button type="danger" size="medium" @click="getShare"
        ><i class="el-icon-share"></i>分享</el-button
      >
    </div>
    <div class="bread">
      <el-breadcrumb
        v-for="(item, index) in breadcrumbList"
        :key="index"
        separator-class="el-icon-arrow-right"
      >
        <el-breadcrumb-item>{{ item }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-table
      ref="tableRef"
      :data="tableData"
      style="width: 100%"
      height="600"
      highlight-current-row
      @select="handleSelect"
      @select-all="handleSelectAll"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="文件名" prop="fileName">
        <!--
          文件夹 el-icon-folder-opened
          文件   el-icon-document
         -->
        <template slot-scope="scope">
          <i class="el-icon-folder-opened"></i>
          <el-link href="javascript:void(0);" :underline="false">{{
            scope.row.fileName
          }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="大小" prop="size"></el-table-column>
      <el-table-column label="修改日期" prop="updateTime"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="handle(scope.row)"
            ><i class="el-icon-share"></i>分享</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="文件上传" :visible="isUploadShow" top="30vh">
      <div class="pre">请选择所需上传到服务器的文件</div>
      <input ref="input" type="file" @change="changeFile()" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="isUploadShow = false">取 消</el-button>
        <el-button type="danger" @click="uploadFile">上 传</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { uploadfile, getfile } from "@/network/plate.js";
import sus from "./createElement/sus";

export default {
  data() {
    return {
      breadcrumbList: ["文件名"],
      tableData: [
        {
          fileName: "哈哈哈",
          size: "20M",
          updateTime: "2021-10-19",
        },
        {
          fileName: "啥意思",
          size: "30M",
          updateTime: "2021-10-19",
        },
      ],
      isUploadShow: false,
      uploadFileName: "", // 上传文件的文件名
      uploadFileErrMsg: "", // 上传文件的错误信息提示
    };
  },
  created() {},
  methods: {
    // 分享
    handle(s) {},
    // 表格事件
    handleSelect(val) {
      console.log(val);
    },
    handleSelectAll(val) {
      console.log(val);
    },
    toggleSelection(rows) {
      const h = this.$createElement;
      const msg = "33456";
      this.$alert(
        h(sus, {
          props: {
            msg: msg,
          },
        }),
        "标题名称",
        {
          confirmButtonText: "确定",
          callback: (action) => {
            this.$message({
              type: "info",
              message: `action: ${action}`,
            });
          },
        }
      );
    },
    onSuccess(res) {
      const h = this.$createElement;
      if (res.code === "000000") {
        this.$emit("importVictory");
      } else if (res.code === "1036") {
        this.$msgbox({
          type: "error",
          title: "导入失败,请检查表格字段完整性",
          // message: h(MapImportFil, {
          //   props: {
          //     msg: res.message,
          //   },
          // }),
        });
      } else {
        this.$msgbox({
          type: "error",
          title: "导入失败",
          message: res.message,
        });
      }
    },
    // 文件上传
    /**
     * 1. 将文件转化为 formdata 格式
     * 2. 接口请求头部改为 multipart/form-data
     * */
    clickUpload() {
      this.isUploadShow = true;
    },
    changeFile(val) {
      console.log(this.$refs.input.files[0]); // name size type lastModified
    },
    uploadFile() {
      const file = this.$refs.input.files[0];
      this.uploadFileName = `（${file.name}）`;
      const formData = new FormData(); // 将文件转为formdata格式
      formData.append("files", file);
      uploadfile(formData)
        .then((res) => {
          console.log("res", res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getShare() {
      const name = "react.md";
      getfile({ name }).then((res) => {
        const reader = new FileReader();
        reader.readAsDataURL(res);
        reader.onload = () => {
          console.log(reader.result);
          const a = document.createElement("a");
          a.href = reader.result;
          a.download = name;
          a.click();
        };
        reader.onerror = (e) => {
          console.log("Error", e);
        };
      });
    },
  },
};
</script>

<style scoped lang="less">
container {
  .toolBox {
    margin: 10px 0 20px 0;
  }
  .bread {
    display: flex;
    margin-bottom: 10px;
    ::v-deep .el-breadcrumb__separator {
      display: inline-block !important;
    }
  }
  ::v-deep .el-table td {
    padding: 0;
    .cell {
      line-height: 48px;
      .el-icon-folder-opened:before {
        font-size: 22px;
        color: #f56c6c;
      }
    }
  }
  ::v-deep .el-dialog__wrapper {
    .el-dialog__title {
      color: #f56c6c;
    }
    .pre {
      margin: 0 0 20px 0;
      color: #f56c6c;
    }
  }
}
</style>
