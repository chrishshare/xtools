<template>
<div class="search-bar">
    <Form :model="attendancSearch" :label-width="80">
      <form-item label="项目群">
        <Select v-model="attendancSearch.projectgroup" @on-change="queryProject">
          <Option v-for="pg in projectGroup" :key="pg.id" :value="pg.id">{{pg.group_name}}</Option>

        </Select>
      </form-item>

      <form-item label="项目组">
        <Select v-model="attendancSearch.project" >
          <Option v-for="pj in project" :key="pj.id" :value="pj.id">{{pj.project_name}}</Option>

        </Select>
      </form-item>

    </Form>
  <Modal v-model="attendanceModal">
    <Form>
      <FormItem label="input">
        <Input v-model="newAttend.staff" placeholder="Enter something..."></Input>
      </FormItem>
    </Form>

  </Modal>
</div>
</template>

<script>

export default {
  name: 'Attendance',
  data () {
    return {
      attendanceModal: false,
      newAttend: {
        staff: localStorage.getItem('username')
      },
      projectGroup: [],
      project: [],
      attendancSearch: {
        projectgroup: '',
        project: ''
    }

    }
  },
  methods: {
    queryAttendance() {
      this.$http.get('api/v1/tpintf/qryattendancelist/').then(res => {
        console.log(res.data)
      })
    },
    queryProjectGroup() {
      this.$http.get('api/v1/tpintf/projectproup/').then(rest => {
        this.projectGroup = rest.data
      })
    },
    queryProject() {
      this.$http.get('api/v1/tpintf/project/', {params: {id: this.attendancSearch.projectgroup}}).then(res => {
        this.project = res.data
      })
    }
  },
  created() {
    this.queryProjectGroup()
  }
}
</script>

<style scoped>

</style>
