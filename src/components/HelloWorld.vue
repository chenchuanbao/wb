<template>
  <div class="hello">
      <Header></Header>
      <el-container style="border: 1px solid #eee">
      <Aside></Aside>
    <el-main>



      <el-table  style="width: 100%" @filter-change="handleFilterChange"  id="out-table" v-loading="loading"  class="tb-edit"   :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"   @row-click="handleCurrentChanges">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>

        <el-table-column  prop="wvdate"  label="时间" width="140">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
              <!--   <el-tag size="medium">{{scope.row.wvdate|formatDate}}</el-tag> -->
                 <el-tag size="medium">{{scope.row.wvdate|time}}</el-tag>
              </div>
            </template>
        </el-table-column>
        <el-table-column prop="wbname" label="姓名" width="100">
        </el-table-column>

        <el-table-column  prop="wbtel"  label="电话" width="113">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
              <!--   <el-tag size="medium">{{scope.row.wvdate|formatDate}}</el-tag> -->
                 <el-tag size="medium"> {{ scope.row.wbtel|capitalize}}</el-tag>
              </div>
            </template>
        </el-table-column>




        <el-table-column prop="wbqq" label="QQ" width="113">
        </el-table-column>
        <!-- <el-table-column prop="address" label="QQ号">
        </el-table-column> -->
        <!-- <el-table-column prop="wbclass" label="专业/渠道" width="160">
        </el-table-column> -->

         <el-table-column
            prop="wbclass"
            label="专业/渠道"
            width="140"
            :filters="tagdatas"
            :filter-method="filterTag"
            filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-tag style="background: #fff;border: none;"
                :type="scope.row.wbclass === '夜间计划' ? 'primary' : 'info'"
                disable-transitions>{{scope.row.wbclass}}</el-tag>
            </template>
          </el-table-column>


        <el-table-column prop="vurl" label="来源平台" width="90">
            <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.vurl}}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.vurl|capitalize}}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>





        <el-table-column   :show-overflow-tooltip="true" prop="wbcallf" label="回访记录" width="140px">
            <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>{{ scope.row.wbcallf}}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.wbcallf}}</el-tag>
                  </div>
                </el-popover>
          </template>



        </el-table-column>

       <!--  <el-table-column prop="wbcallt" label="处理结果">
             <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>{{ scope.row.wbcallt}}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium" style="color:#ff0000">{{ scope.row.wbcallt}}</el-tag>
                  </div>
                </el-popover>
          </template>
        </el-table-column> -->
       <!--  <el-table-column  prop="wbcallt"  label="处理结果" width="140">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">

                 <el-tag size="medium" style="color: #ff0000;background: #fff">{{scope.row.wbcallt}}</el-tag>
              </div>
            </template>
        </el-table-column> -->


        <el-table-column
            prop="wbcallt"
            label="处理结果"
            width="130"
            :filters="retagdatas"
            :filter-method="filterTags"
            filter-placement="bottom-end">
            <template slot-scope="scope">
               <div slot="reference" class="name-wrapper">
              <!--   <el-tag size="medium">{{scope.row.wvdate|formatDate}}</el-tag> -->

                 <el-tag  size="medium" style="background: #fff"
                :type="scope.row.wbcallt === '有效' ? 'danger' : 'success'"
                disable-transitions>{{scope.row.wbcallt}}</el-tag>
              </div>

            </template>
          </el-table-column>



        <el-table-column prop="wbcalls" label="其他备注">
             <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>{{ scope.row.wbcalls}}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.wbcalls}}</el-tag>
                  </div>
                </el-popover>
          </template>
        </el-table-column>


        <el-table-column label="操作" width="160"  @cell-click="tableVis(row)">
            <template slot-scope="scope">
                <el-button @click='tableVis(scope.row)' type="primary" icon="el-icon-edit" circle  size="mini"></el-button>
                <el-button size="mini" type="info" icon="el-icon-delete" @click='tabledel(scope.$index, scope.row)' v-show="false"></el-button>
                 <el-button size="mini" type="danger" icon="el-icon-message" circle  @click='messageInfo(scope.$index, scope.row)' v-show="true"></el-button>
            </template>
          </el-table-column>







          <el-table-column prop="vqq"  label="最后更新" width="130">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">
                  <el-tag :type="scope.row.vqq === '' ? 'success' : 'primary'" size="medium">{{scope.row.vqq|time}}</el-tag>

                </div>
              </template>
          </el-table-column>

           <el-table-column
            prop="wbuser"
            label="负责帐号"
            width="90"
            :filters="userdatas"
            :filter-method="filterusers"
            filter-placement="bottom-end">
            <template slot-scope="scope">
               <div slot="reference" class="name-wrapper">
              <!--   <el-tag size="medium">{{scope.row.wvdate|formatDate}}</el-tag> -->

                 <el-tag  size="medium" style="background: #fff"
                :type="scope.row.wbuser === '' ? 'danger' : 'success'"
                disable-transitions>{{scope.row.wbuser|capitalizes}}</el-tag>
              </div>

            </template>
          </el-table-column>



      </el-table>



      <el-pagination  v-show="pageshow"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
     @filter-change="handleFilterChange"
    :current-page="currentPage"
    :page-sizes="[20,100,200,500,1000,5000,10000]"
    :page-size="pagesize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="tableData.length">
      </el-pagination>

      <el-dialog title="回访记录" :visible.sync="dialogFormVisible">
        <span v-html="xtmsg" style="color: #ff0000"></span>
        <el-form  :label-position="labelPosition"  :model="form" style="margin-top:20px">
          <!-- <el-form-item label="一次回访记录：" :label-width="formLabelWidth">
            <el-input v-model="form.wbcallf" auto-complete="off"></el-input>
          </el-form-item> -->

          <el-table
                    :data="wbcons"
                    style="width: 100%">
                      <el-table-column  prop="wbctime"  label="时间" width="140">
                          <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                            <!--   <el-tag size="medium">{{scope.row.wvdate|formatDate}}</el-tag> -->
                               <el-tag size="medium">{{scope.row.wbctime|time}}</el-tag>
                            </div>
                          </template>
                      </el-table-column>
                    <el-table-column
                      prop="wbcuser"
                      label="处理工号"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="wbcon"
                      label="录入内容">
                    </el-table-column>
          </el-table>

          <el-form-item label="回访记录添加" prop="desc">
            <el-input type="textarea" v-model="form.wbcallfs" :autosize="{ minRows: 2, maxRows: 10}"></el-input>
          </el-form-item>

          <!-- <el-form-item label="二次回访记录：" :label-width="formLabelWidth">
            <el-input v-model="form.wbcallt" auto-complete="off"></el-input>
          </el-form-item> -->
          <el-form-item label="处理进度" :label-width="formLabelWidth">
            <el-radio-group  v-model="form.wbcallt">
              <el-radio label="有效"></el-radio>
              <el-radio label="无效"></el-radio>
              <el-radio label="重复信息"></el-radio>
              <el-radio label="继续跟进"></el-radio>
            </el-radio-group>
          </el-form-item>


          <el-form-item label="其他备注（重要备注信息,可不填写）" :label-width="formLabelWidth">
            <el-input v-model="form.wbcalls" auto-complete="off"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="confirmerr">取 消</el-button>
          <el-button  :plain="true" type="primary" @click="confirmsure">确 定</el-button>
           <!-- <el-button type="primary" @click="innerVisible = true">历史处理记录</el-button> -->
        </div>
          <!-- //内层Dialog -->

      </el-dialog>




      <!-- 短信窗口 -->
      <el-dialog title="短信回复(选择模版后自动发送，请务必认真选择，不要重复点击)" :visible.sync="dialogMessage">
        <el-form>
          <el-form-item label="选择短信模版" :label-width="formLabelWidth">
            <el-select v-model="formMessages" placeholder="短信模版" size="500">
              <el-option v-for="message in formMessage"
              :key="message.value"
              :label="message.label"
              :value="message.value">
              </el-option>

            </el-select>
          </el-form-item>
        </el-form>
        <div style="display: none;" slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="messagesend = false">发送</el-button>
        </div>
      </el-dialog>


    </el-main>
  </el-container>

  </div>
</template>

<script>
  import Aside from './Aside'
  import Header from './Header'
  export default {
      components:{
        Aside,
        Header
      },
      //时间过滤--------------------
     filters: {
      time: function (value) {
      let d = new Date(parseInt(value) * 1000)
      return (d.getFullYear()) + '-' + (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + '-' + (d.getDate() > 9 ? d.getDate() : '0' + d.getDate())+'-'+(d.getHours() > 9 ? d.getHours():'0'+d.getHours())+':'+(d.getMinutes())
      },
      capitalize: function (value) {
          if (value.indexOf("gdt=")>=0) return '广点通';
          if (value.indexOf("kuaishou")>=0) return '快手';
          if (value.indexOf("smss")>=0) return '神马';
          if (value.indexOf("jjsgm")>=0) return '搜狗无线';
           if (value.indexOf("bdm")>=0) return '百度';
          if (value.indexOf("bd")>=0) return '百度';
          if (value=='') return '自媒体';
          if (value=='无') return '';
          if (value=='') return '手机首页';
          value = value.toString();
          return value;
        },
        capitalizes: function (value) {

        }
    },

     data() {
      const item = {
        wvdate: '',
        wbname: '',
        wbtel: '',
        wbclass: '',
        wbid: '',
        vurl: '',
        wbqq:'',
        wbcallf: '',
        wbcallt: '',
        wbcalls: '',
        vqq:'',
        wbuser:''

      };
      return {
        search: '',
        formMessage:[
          {label:'选择短信模版',value:0},
          {label:'接通说打错',value:1},
          {label:'电话未接通',value:2},
          {label:'沟通成功',value:3},
           {label:'去电挂断',value:4},

        ],
        loading2:false,
        formMessages:0,
        dialogMessage:false,
        outerVisible: false,
        innerVisible: false,
        pageshow:'true',
        xtmsg:'查询中...',
        bzvis:true,
        loading: true,
        labelPosition: 'top',
        tableData: [
                     {
                       wbid: "4874",
                       wvdate: "1543194584",
                       wbname: "绿色很好",
                       wbtel: "无",
                       wbclass: "快手免费",
                       vurl: "",
                       wbcallf: "通过",
                       wbcallt: "",
                       wbcalls: "电竞 英雄联盟",
                       wbqq: "1104592878（qq）",
                       wbqqs: null,
                       vqq: "1543196442",
                       wbuser: "csxinhuaWb05"
                     },
                     {
                       wbid: "4873",
                       wvdate: "1543194522",
                       wbname: "普通市民呐",
                       wbtel: "无",
                       wbclass: "快手免费",
                       vurl: "",
                       wbcallf: "已加，",
                       wbcallt: "",
                       wbcalls: "在上职高 打算来我们学校",
                       wbqq: "3178227010（qq）",
                       wbqqs: null,
                       vqq: "1543196403",
                       wbuser: "csxinhuaWb05"
                     },
                     {
                       wbid: "4872",
                       wvdate: "1543194423",
                       wbname: "00:00:00491",
                       wbtel: "无",
                       wbclass: "快手免费",
                       vurl: "",
                       wbcallf: "通过",
                       wbcallt: "",
                       wbcalls: "问报名",
                       wbqq: "2935461778 （qq）",
                       wbqqs: null,
                       vqq: "1543196436",
                       wbuser: "csxinhuaWb05"
                     },
                     {
                       wbid: "4871",
                       wvdate: "1543178904",
                       wbname: "彭泽华",
                       wbtel: "18670441826",
                       wbclass: "夜间计划",
                       vurl: "dj.html?jjsgmyj_dj_0032&utm_campaign=jjsgm&utm_term=%C4%C4%C0%EF%D3%D0%B5%E7%BE%BA%D1%A7%D0%A3",
                       wbcallf: "空号，QQ待验证",
                       wbcallt: "继续跟进",
                       wbcalls: "",
                       wbqq: "3240064944",
                       wbqqs: null,
                       vqq: "1543193649",
                       wbuser: "csxinhuaWb02"
                     },
                     {
                       wbid: "4870",
                       wvdate: "1543156557",
                       wbname: "邹志豪",
                       wbtel: "18273455052",
                       wbclass: "夜间计划",
                       vurl: "dj.html?jjsgmyj_dj_0027&utm_campaign=jjsgm&utm_term=%B5%E7%BE%BA%D1%A7%D0%A3%C2%BC%C8%A1%CC%F5%BC%FE",
                       wbcallf: "录入",
                       wbcallt: "有效",
                       wbcalls: "",
                       wbqq: "3286877212",
                       wbqqs: null,
                       vqq: "1543194462",
                       wbuser: "csxinhuaWb02"
                     },
                     {
                       wbid: "4869",
                       wvdate: "1543156080",
                       wbname: "刘志彰",
                       wbtel: "18674644566",
                       wbclass: "夜间计划",
                       vurl: "dj.html?jjsgmyj_dj_0062&utm_campaign=jjsgm&utm_term=%B5%E7%BE%BA%D1%A7%D0%A3",
                       wbcallf: "未接通，发了短信，QQ待验证",
                       wbcallt: "继续跟进",
                       wbcalls: "",
                       wbqq: "3126235415",
                       wbqqs: null,
                       vqq: "1543194696",
                       wbuser: "csxinhuaWb02"
                     },
                     {
                       wbid: "4868",
                       wvdate: "1543155427",
                       wbname: "黄嘉俊",
                       wbtel: "17607487008",
                       wbclass: "夜间计划",
                       vurl: "dj.html?bdmyj_dj0064&utm_campaign=bdm&utm_term=%B5%E7%BE%BA%D1%A7%D0%A3%D1%A7%B7%D1%B6%E0%C9%D9",
                       wbcallf: "未接，发了短信，Q待验证",
                       wbcallt: "继续跟进",
                       wbcalls: "",
                       wbqq: "2380416436",
                       wbqqs: null,
                       vqq: "1543194943",
                       wbuser: "csxinhuaWb02"
                     },
                     {
                       wbid: "4867",
                       wvdate: "1543151087",
                       wbname: "彭雅玲",
                       wbtel: "18573685635",
                       wbclass: "邮寄资料",
                       vurl: "ppczs.html?gdt=240&180=1122&qz_gdt=kwnpuw3uamadkyqtmcvq",
                       wbcallf: "通过了QQ，不回信息",
                       wbcallt: "继续跟进",
                       wbcalls: "",
                       wbqq: "647837125",
                       wbqqs: null,
                       vqq: "1543198643",
                       wbuser: "csxinhuaWb02"
                     },
                     {
                       wbid: "4866",
                       wvdate: "1543139524",
                       wbname: "唐城勇",
                       wbtel: "17674675407",
                       wbclass: "初、高中毕业学IT",
                       vurl: "/kuaishou/19s_11_kb.html?kspp",
                       wbcallf: "未接，发了短信，QQ待验证",
                       wbcallt: "继续跟进",
                       wbcalls: "",
                       wbqq: "1610261072",
                       wbqqs: null,
                       vqq: "1543195188",
                       wbuser: "csxinhuaWb02"
                     }
                   ]
,
        wbcons:Array(10).fill(item),
        fullscreenLoading: false,
        pagesize:100,
        currentPage:1,
         dialogFormVisible: false,
          formLabelWidth: '120px',
         form: {
          name: '',
          region: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          wbcallf:'',
          wbcallfs:'',
          wbcallt:'',
          wbcalls:'',
          wbid:'',
          wbtel: '',
          vqq:'',
          wbctime:'',
          wbcon:'',
          wbcuser:'',
          wbuser:''
        },
        tagdatas:[
        { text: '微博', value: '微博' },
        { text: '抖音', value: '抖音' },
        { text: '微视', value: '微视' },
        { text: '头条', value: '头条' },
        { text: '社群', value: '社群' },
        { text: '直播', value: '直播' },
        { text: '免推QQ', value: '免推QQ' },
        { text: '快手推广', value: '快手推广' },
        { text: '快手免费', value: '快手免费' },
        { text: '免推58', value: '免推58' },
        { text: 'QQ空间', value: 'QQ空间' },
        { text: '企鹅媒体', value: '企鹅媒体' },
        { text: '智慧校园', value: '智慧校园' },
        { text: '微信公众', value: '微信公众' },
        { text: '夜间计划', value: '夜间计划' },
        { text: '今日头条', value: '今日头条' },
        { text: '一分钟测评', value: '一分钟测评' }

        ],
        retagdatas:[
          { text: '有效', value: '有效' },
        { text: '无效', value: '无效' },
        { text: '重复信息', value: '重复信息' },
        { text: '继续跟进', value: '继续跟进' }

        ],
        userdatas:[

        ],
        retagdataurl:[
          { text: '百度', value: '百度' },
          { text: '搜狗', value: '搜狗' },
          { text: '自媒体', value: '自媒体' },
          { text: '广点通', value: '广点通' }
        ]
      }
    },
    watch:{
      formMessages:function(newval,oldval){
        //console.log(newval,oldval);
        this.messagesend(newval);
        this.formMessages=0;
        if(this.dialogMessage=false){
          this.formMessages=0;
        }
      }
    },
    mounted(){
      this.vid();
      this.openFullScreen();
      this.getWbList();
      //this.AllCommodityList()
    },
    methods: {
      pickerOptions2(){
        console.log(this.value7)
      },
      //  formatter(row, column) {
      //   return row.address;
      // },
      filterTag(value, row) {
        return row.wbclass === value;
      },
      filterTags(value, row) {
        return row.wbcallt === value;
      },
      filterusers(value, row) {
        return row.wbuser === value;
      },
      filterTagurl(value, row) {
        return row.vurl === value;
      },
      handleFilterChange(row, event, column){
         //console.log(value,row);
         //this.pageshow=false

      },
      // filterHandler(value, row, column) {
      //   const property = column['property'];
      //   return row[property] === value;
      // },
       handleCurrentChanges(row, event, column) {
          //console.log(row, event, column, event.currentTarget)
          //console.log(row.wbid);
          this.form.wbid=row.wbid;
          this.form.wbcallf=row.wbcallf;
          this.form.wbcallt=row.wbcallt;
          this.form.wbcalls=row.wbcalls;
          this.form.wbcallfs='';
         // console.log(row.wvdate);
    },

    // messageInfo(index,row){
    //    var _this= this;
    //    this.$confirm('您确定给该客户发送短信吗?', '提示', {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       this.$axios.get('')
    //        .then(function (response) {
    //      //console.log(response.data);
    //       })
    //       this.$message({
    //         type: 'success',
    //         message: '发送成功!'
    //       });
    //     }).catch(() => {
    //       this.$message({
    //         type: 'info',
    //         message: '取消发送'
    //       });
    //     });
    // },
    //短信区域
    messageInfo(index,row){
        var _this=this;
        //console.log(row.wbtel);
         if(row.wbtel.length>10){
            _this.dialogMessage=true;
          }else{
             this.$message.error('该信息无电话号码，不能发送');
          }
        //console.log(this.formMessages)
       _this.form.wbtel=row.wbtel//接收电话号码
    },

    messagesend(newval){
    //alert(newval);
    //this.formMessages=newval;
    //console.log(newval);
    //console.log(this.form.wbtel);
        if(newval==1){
            this.$axios.get('')
              .then((response)=>{
                if(response.data.resp.respCode=='000000'){
                  this.dialogMessage=false;
                  this.$message({
                    message: '给号码-'+this.form.wbtel+'-的短信发送成功',
                    type: 'success'
                  });
                }

              })
              .catch((error)=>{

              })

        }
        if(newval==2){
          this.$axios.get('')
              .then((response)=>{
                if(response.data.resp.respCode=='000000'){
                  this.dialogMessage=false;
                  this.$message({
                    message: '给号码-'+this.form.wbtel+'-的短信发送成功',
                    type: 'success'
                  });
                }

              })
              .catch((error)=>{

              })

        }
        if(newval==3){
          this.$axios.get('')
              .then((response)=>{
                if(response.data.resp.respCode=='000000'){
                  this.dialogMessage=false;
                  this.$message({
                    message: '给号码-'+this.form.wbtel+'-的短信发送成功',
                    type: 'success'
                  });
                }

              })
              .catch((error)=>{

              })

        }
        if(newval==4){
          this.$axios.get('')
              .then((response)=>{
                if(response.data.resp.respCode=='000000'){
                  this.dialogMessage=false;
                  this.$message({
                    message: '给号码-'+this.form.wbtel+'-的短信发送成功',
                    type: 'success'
                  });
                }

              })
              .catch((error)=>{

              })

        }

    },

    //信息更改表单----------------------------------------------------------------
    confirmsure(){
      //console.log(this.form.wbid);
      var _this= this;
      var value = sessionStorage.getItem("csxhusername");
      this.$axios.get('',{
          params: {
          wbid: this.form.wbid,
          wbcallf:this.form.wbcallfs,
          wbcallt:this.form.wbcallt,
          wbcalls:this.form.wbcalls,
          vqq:this.form.vqq,
          wbuser:value
          }
          })
          .then(function (response) {
           // console.log(response.data);
              if(response.data=='suc'){
                  //location.reload();
                  _this.dialogFormVisible = false;
                  _this.xtmsg='3++查询中...';
                   _this.$message({
                    message: '恭喜你，成功更新消息',
                    type: 'success'
                  });
                  _this.getWbList();
              }

          })
          .catch(function (error) {
            console.log(error);
          });


          //更改
          this.$axios.get('',{
          params: {
          wbid: this.form.wbid,
          wbcuser:value,
          wbcon:this.form.wbcallfs
          }
          })
          .then(function (response) {
           console.log(response.data);
              if(response.data=='suc'){
                  //location.reload();
                 console.log('信息插入');
              }else if(response.data==3){
                   _this.$message({
                    message: '内容为空，更新失败',
                    type: 'danger'
                  });
              }

          })
          .catch(function (error) {
            console.log(error);
          });


    },

    confirmerr(){
      var _this= this;
      this.dialogFormVisible = false;
      this.$message('您已取消操作');
      this.xtmsg='3++查询中...'

    },
      //验证登录信息-----------------------------------------------
      vid(){
         var value = sessionStorage.getItem("csxhusername");
          if(!value){
              this.$router.push({path: '/csxhlogin'});
          }
      },

      tableVis(row){
        var _this= this;
        _this.dialogFormVisible=true;
        //console.log(row);
        this.tel = row.wbtel;
        this.qqs = row.wbqq;

        if(this.tel!="无" && this.qqs==''){
            this.$axios.get('',{
            params:{
              key: '2215BF2949A2560512B3264A760feE699F',
              tel: row.wbtel
            }
        }).then(function (response) {
         //console.log(response.data);
            //console.log(response);
           _this.xtmsg=response.data
          })
        }else if(this.tel=="无" && this.qqs!=''){
             this.$axios.get('',{
            params:{
              key: '2215BF2949A2560512B3264A76fe0E699F',
              qqs: row.wbqq
            }
        }).then(function (response) {
         //console.log(response.data);
            //console.log(response);
           _this.xtmsg=response.data
          })
        }else{
          this.$axios.get('',{
            params:{
              key: '2215BF2949A2560512B3264A760Efe699F',
              tel: row.wbtel
            }
        }).then(function (response) {
         //console.log(response.data);
            //console.log(response);
           _this.xtmsg=response.data
          })
        };



         //处理信息记录
          this.$axios.get('',{
          params: {
          wbid: row.wbid
          }
          })
          .then(function (response) {
           // console.log(response.data);
              if(response.data){
                  //location.reload();
                 console.log(response.data);
                 _this.wbcons=response.data
              }

          })
          .catch(function (error) {
            console.log(error);
          });

      },

      //删除语句--------------------------------------------------
      tabledel(index,row){
         var _this= this;
        //console.log(row.wbid),
         this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //console.log(row.wbid),
          this.$axios.get('',{
          params: {
          wbid: this.form.wbid}
          })
          .then(function (response) {
         //console.log(response.data);
            _this.getWbList();
          })
          this.$message({
            type: 'success',
            message: '删除成功!'

          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //数据初始化-----------------------------------------------------
      getWbList(){
        var _this= this;
        this.$axios.get('')
          .then(function (response) {
            console.log(response.data);
            _this.tableData=response.data;
            //console.log(_this.tableData.length);
            _this.loading=false;

          })
          .catch(function (error) {
            console.log(error);
          });
      },
      //-----------------------------------------------------------------
    openFullScreen() {
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 1000);
    },

   handleSizeChange(val) {
      this.pagesize = val;
//        console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    }
  }
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.el-form-item{
  text-align: left;
}
h1, h2 {
  font-weight: normal;
}
.el-table th>.cell{
  text-align: center !important;
}
.el-table th>.cell{
  text-align: center;
}
.el-pagination{
  padding: 15px 0;
  text-align: left;
}
a {
  color: #42b983;
}
  .el-header, .el-footer {
    background-color: #333744;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
   .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;

  }

  body > .el-container {
    margin-bottom: 40px;
  }
    .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  .el-menu{
    height: 100%;
    position: fixed;
    bottom: 0;
    top: 60px;
    left: 0;

  }
  .el-header{
        background-color: rgb(84, 92, 100);
  }

 .source>i {
    color: #fff;
    margin: 0 20px;
    font-size: 1.5em !important;
    vertical-align: middle;
}

tbody tr td{

}
.el-tag--danger{
  color: #ff0000 !important
}
</style>
