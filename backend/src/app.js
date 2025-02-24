const koa = require('koa')
const router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const goodstype = require('./dao/goodsTypeDao')
const goodsDao = require('./dao/goodsDao')
const registerController = require('./controller/register')  // 导入注册控制器
const loginController = require('./controller/auth')
const purchaseController = require('./controller/purchase')
const addressController = require('./controller/address')

const appRouter = new router()

appRouter.get('/goodsType', async ctx => {
    let result = null
    result = await goodstype.selectAllGoodsType()
    ctx.body = result
})
appRouter.get('/goods/:typeId', async ctx => {
    let typeId = ctx.params.typeId
    let result = await goodsDao.selectGoodsByTypeId(typeId)
    ctx.body = result
})

// 用户注册
appRouter.post('/register', registerController.register)
appRouter.post('/login', loginController.login)

appRouter.post('/purchase', purchaseController.purchase)

appRouter.post('/address', addressController.create)
appRouter.put('/address/default/:addressId', addressController.setDefault)
appRouter.get('/address', addressController.get)

const app = new koa()

app.use(bodyParser())
app.use(cors())
app.use(appRouter.routes())

const port = 8080
app.listen(port, () => {
    console.log(`server is running.`)
})
