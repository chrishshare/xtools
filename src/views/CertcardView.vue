<template>
<!--  省 市 区县 性别 开始年份 结束年份 生成数量-->
  <div>
    <div class="search-area">
      <Form label-position="left" :label-width="80" label-colon>
        <!--省-->
        <Row :gutter="32">
          <Col span="8">
            <FormItem label="省份">
              <Select  v-model="certCardForm.provincecode" @on-change="queryCity">
                <Option v-for="plitem in provinceList" :value="plitem.province_code" :key="plitem.province_code">{{ plitem.province_name }}</Option>
              </Select>
            </FormItem>
          </Col>


          <!--市-->
          <Col span="8">
            <FormItem label="地市">
              <Select  v-model="certCardForm.citycode"  @on-change="queryCounty">
                <Option v-for="clitem in cityList" :value="clitem.citycode" :key="clitem.citycode">{{ clitem.cityname }}</Option>
              </Select>
            </FormItem>
          </Col>


          <!--区县-->
          <Col span="8">
            <FormItem label="区县">
              <Select  v-model="certCardForm.countycode">
                <Option v-for="cnlitem in countyList" :value="cnlitem.countycode" :key="cnlitem.countycode">{{ cnlitem.countyname }}</Option>
              </Select>
            </FormItem>
          </Col>


          <!--开始年份-->
          <Col span="4">
            <FormItem label="开始年份">
              <DatePicker type="year" placeholder="开始年份" v-model="certCardForm.startYear"></DatePicker>
            </FormItem>
          </Col>


          <!--结束年份-->
          <Col span="4">
            <FormItem label="结束年份">
              <DatePicker type="year" placeholder="结束年份" v-model="certCardForm.endYear"></DatePicker>
            </FormItem>
          </Col>

          <Col span="2">
            <FormItem label="性别">
              <Select  v-model="certCardForm.gender">
                <Option v-for="gdlitem in genderList" :value="gdlitem.key" :key="gdlitem.key">{{ gdlitem.value }}</Option>
              </Select>
            </FormItem>
          </Col>

          <Col span="2">
            <FormItem label="条数">
              <InputNumber v-model="certCardForm.count"></InputNumber>
            </FormItem>
          </Col>

          <Col span="4">
            <ButtonGroup>
              <Button type="primary" @click="querCertcard">查询</Button>
              <Button type="warning">重置</Button>
            </ButtonGroup>

          </Col>


        </Row>
      </Form>

      <Divider>查询结果</Divider>

      <Row :gutter="32">
        <Col span="3" v-for="ccitem in certcardList" :key="ccitem.cardnum" >
          <div class="card-info">
            <p>{{ccitem.cardnum}}</p>
            <p>{{ccitem.address}}</p>
          </div>
        </Col>
      </Row>


    </div>

  </div>

</template>

<script>
export default {
  name: "CertcardView",
  data () {
    return {
      certCardForm: {
        provincecode: '',
        citycode: '',
        countycode: '',
        startYear: '1921',
        endYear: '2005',
        count: 16,
        gender: 0
      },
      provinceList: [],
      cityList: [],
      countyList: [],
      certcardList: [],
      genderList: [
        {'key': 0, 'value': '女'},
        {'key': 1, 'value': '男'},
      ]
    }
  },
  methods: {
    queryProvince () {
      this.$http.get('v1/cert/qryprovince/').then(result => {
        console.log(result)
        this.provinceList = result.body
      })
    },
    queryCity () {
      this.$http.get('v1/cert/qrycity/', {params: {provincecode: this.certCardForm.provincecode}}).then(result => {
        console.log(this.certCardForm.provincecode)
        console.log(result)
        this.cityList = result.body
      })
    },
    queryCounty () {
      this.$http.get('v1/cert/qrycounty/', {params: {citycode: this.certCardForm.citycode}}).then(result => {
        console.log(this.certCardForm.citycode)
        console.log(result)
        this.countyList = result.body
      })
    },
    querCertcard () {
      this.$http.get('v1/cert/qrycertcard/', {params: {provincecode: this.certCardForm.provincecode, citycode: this.certCardForm.citycode, countycode: this.certCardForm.countycode, startYear: this.certCardForm.startYear, endYear: this.certCardForm.endYear, count: this.certCardForm.count, gender: this.certCardForm.gender}}).then(result => {
        console.log(result)
        this.certcardList = result.body
      })
    }
  },
  created() {
    this.queryProvince()
  }
}
</script>

<style scoped>
.card-info {
  font-size: large;
  padding-bottom: 50px;
}

</style>