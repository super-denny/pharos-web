<template>
    <div class="__body">
        <t-row :gutter="[16, 16]">
            <t-col :flex="3">
                <div class="user-left-greeting">
                    <div>
                        Hi，{{ nickname }}
                    </div>
                    <img src="../../../assets/logo.png" class="logo"/>
                </div>

                <t-card class="user-info-list" :description=desc>
                    <t-list :split="true" v-for="item in submitList">
                        <t-list-item>
                            <b style="font-size: 15px;">{{ item.title }}</b>
                            <br>
                            <b style="font-size: 10px;">{{ item.url }}</b>
                            <br>
                            <b style="font-size: 10px;">提报时间:{{ item.gmtCreate }}</b>
                            <br>
                            <span v-if=item.failReason>
                                <span style="color: red">拒绝原因: {{ item.failReason }}</span>
                            </span>
                            <template #action>
                                <span v-if="item.status === 0" style="color: orange">等待审核</span>
                                <span v-if="item.status === 1" style="color: green">审核通过</span>
                                <span v-if="item.status === 2" style="color: red">审核失败</span>
                            </template>
                        </t-list-item>
                    </t-list>
                </t-card>
            </t-col>

            <t-col :flex="1">
                <t-card class="user-intro">
                    <t-avatar size="90px">{{ nickname }}</t-avatar>
                    <div class="name">{{ account }}</div>
                    <!--                    <div class="position">...</div>-->
                </t-card>
                <div class="user-team" v-for="item in statisticsList">
                    <t-card class="dashboard-list-card" :description=item.title>
                        <div class="dashboard-list-card__number">{{ item.num }}</div>
                    </t-card>
                </div>
            </t-col>
        </t-row>
    </div>
</template>

<script>
import {get} from "@/common/http";
import {getSubmitList, submitLink} from "@/common/api";

export default {
    name: "PersonCenter",
    data() {
        return {
            account: "",
            nickname: "",
            // 0-待审核 1-审核通过 2-审核失败
            submitList: [{}],
            statisticsList: [{}],
            desc: "提报记录"
        }
    },
    mounted() {
        let userInfo = localStorage.getItem("loginUserInfo");
        let userInfoObj = JSON.parse(userInfo);
        let account = userInfoObj.account;
        let nickname = userInfoObj.nickname;
        this.$data.account = account;
        this.$data.nickname = nickname;

        get(getSubmitList).then(res => {
            if (res.data.code === 10000) {
                this.$data.submitList = res.data.data.list;
                this.$data.statisticsList = res.data.data.statisticsList;
            } else {
                this.$message.error(res.data.msg);
            }
        })
    }
}
</script>

<style scoped>

.__body {
    background-color: rgba(235, 239, 233, 0.28);
    padding: 5px;
}

.user-left-greeting {
    padding: 0 32px;
    line-height: 28px;
    font-size: 20px;
    background: var(--td-bg-color-container);
    color: var(--td-text-color-primary);
    text-align: left;
    border-radius: var(--td-radius-default);
    display: flex;
    justify-content: space-between;
    align-items: center;

    .regular {
        margin-right: 15px;
        font-size: 14px;
    }

    .logo {
        width: 180px;
    }
}

.user-info-list {
    margin-top: 16px;
    height: 650px;
    overflow: auto;
}

.user-intro {
    padding: 10px 24px;
    background: dodgerblue;
    border-radius: var(--td-radius-default);
    color: var(--td-text-color-primary);

    .name {
        line-height: 37px;
        font-size: 20px;
        margin-top: 36px;
        color: #fff;
    }
}

.user-team {
    margin-top: 16px;
    border: 1px solid #efefef;
    border-radius: 5px;
    padding: 0 10px 10px 10px;
    background-color: white;
    overflow: auto;
}

.dashboard-list-card {
    height: 130px;
    /*background-color: beige;*/
    margin-top: 10px;
}

.dashboard-list-card__number {
    font-size: 25px;
    line-height: 1px;
}
</style>
