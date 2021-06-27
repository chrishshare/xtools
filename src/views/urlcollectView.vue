<template>
  <div class="content">
    <div class="search-area">
      <!--      分类-->
      <Form label-position="left" :label-width="80" label-colon>
        <!--省-->
        <Row :gutter="32">
          <Col span="8">
            <FormItem label="链接类别">
              <Select v-model="urlForm.typecode">
                <Option v-for="tpitem in urlTypeList" :value="tpitem.typecode" :key="tpitem.typecode">{{
                    tpitem.typename
                  }}
                </Option>
              </Select>
            </FormItem>
          </Col>

          <Col span="8">
            <FormItem label="链接名称">
              <Input placeholder="请输入链接名称" v-model="urlForm.urlname"></Input>
            </FormItem>
          </Col>

          <Col span="8">
            <FormItem label="链接地址">
              <Input placeholder="请输入链接地址" v-model="urlForm.urllink"></Input>
            </FormItem>
          </Col>

          <Col span="8">
            <FormItem label="链接地址">
              <Input placeholder="请输入链接地址" v-model="urlForm.urllink"></Input>
            </FormItem>
          </Col>

          <Col span="8">
            <FormItem label="是否共享">
              <Select v-model="urlForm.isShare">
                <Option value="是">是</Option>
                <Option value="否">否</Option>
              </Select>
            </FormItem>
          </Col>


          <Col span="4">
            <ButtonGroup>
              <Button type="primary" @click="queryUrlList">查询</Button>
              <Button type="warning">重置</Button>
            </ButtonGroup>

          </Col>


        </Row>
      </Form>

      <Divider>查询结果</Divider>

      <Row :gutter="32">
        <Col span="6" v-for="ulitem in urlList" :key="ulitem.urllink">
          <Card :bordered="false">
            <p slot="title">{{ulitem.urlname}}</p>
            <a target="_blank" :href="ulitem.urllink">
              <Tooltip :content="ulitem.urllink" placement="top" max-width="300">
                {{ulitem.urllink}}
            </Tooltip>
            </a>

            <div class="card-footer">
              <div class="typename">链接类别：{{ulitem.typename}}<Divider type="vertical" /></div>

              <div class="ishared">是否共享：{{ulitem.shared}}<Divider type="vertical" /></div>

              <div class="username">创建人：{{ulitem.username}}</div>
            </div>
          </Card>
        </Col>
      </Row>

    </div>
  </div>
</template>

<script>
export default {
  name: "urlcollectView",
  data() {
    return {
      urlForm: {
        typecode: '',
        urlname: '',
        urllink: '',
        isShare: '',
      },
      urlTypeList: [],
      urlList: [],
    }
  },
  methods: {
    queryUrlClassify() {
      this.$http.get('v1/clurl/urlclass/', {params: {username: localStorage.getItem("username")}}).then(response => {
        this.urlTypeList = response.body.result
      })
    },
    queryUrlList() {
      this.$http.get('v1/clurl/url/', {
        params: {
          username: localStorage.getItem("username"),
          typecode: this.urlForm.typecode,
          urlname: this.urlForm.urlname,
          urllink: this.urlForm.urllink,
          shared: this.urlForm.isShare
        }
      }).then(response => {
        this.urlList = response.body.result
      })

    }
  },
  created() {
    this.queryUrlClassify()
  }
}
</script>

<style scoped>
/*.card-footer {*/
/*  display: flex;*/
/*}*/

.card-footer {
  padding-top: 20px;
  padding-bottom: 20px;
  font-size: small;
}
.typename {
  display: block;
  float: left;
}

.ishared {
  display: block;
  float: left;
}
.username {
  display: block;
  float: right;
}

</style>