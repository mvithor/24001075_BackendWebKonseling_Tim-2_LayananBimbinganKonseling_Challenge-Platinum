// import {expect, describe, it} from '@jest/globals';
const supertest = require ('supertest')
const app = require ('../routes/pelanggaranRoutes')

const request = supertest(app)

describe('GET /', function (){
    it('200 - success (positive case)', async function (){
        // 1. hit api-nya 
        const response = await request.get('/')
        // 2. make sure response status === 200
        expect(response.status).toBe(200)
        // 3. make sure response data -> object dan didalamnya ada key "getPelanggaran"
        expect(Object.keys(response._body)).toContain('getPelanggaran')
        // 4. make sure response datanya berupa array of object dan skema objeknya harus ada kelas, pelanggaran, poin, deskripsi, procedur_konseling
        expect(Object.keys(response._body.data[0])).toContain('kelas')
        expect(Object.keys(response._body.data[0])).toContain('pelanggaran')
        expect(Object.keys(response._body.data[0])).toContain('poin')
        expect(Object.keys(response._body.data[0])).toContain('deskripsi')
        expect(Object.keys(response._body.data[0])).toContain('prosedur_konseling')
    })
    return
})

describe('POST /tambah-pelanggaran', function (){
    it('200 - success (positive case)', async function (){
        // 1. hit api-nya 
        const response = await request.post('/tambah-pelanggaran')
        .send({kelas:'Testing', pelanggaran:'testing', poin:'3', deskripsi:'bandal kali anak itu',prosedur_konseling:'harus ditaati dulu'})
        // 2. make sure response status === 200
        expect(response.status).toBe(200)
        // 3. make sure response data -> object dan didalamnya ada key "addPelanggaran"
        expect(Object.keys(response._body)).toContain('addPelanggaran')
    })

    it('400 - no input (negative case)', async function (){
        // 1. hit api-nya 
        const response = await request.post('/tambah-pelanggaran')
        .send({ })
        // 2. make sure response status === 400
        expect(response.status).toBe(400)
        // 3. make sure response data -> object dan didalamnya ada key "addPelanggaran"
        expect(Object.keys(response._body)).toContain('addPelanggaran')
    })
    return
})

describe('PUT /:id', function() {
    it('200 - success (positive case)', async function () {
    // 1. hit api-nya 
    // 2. make sure response status === 200
      const response = await request
        .put('/1')
        .send({ })
        .expect(200);
    // 3. make sure response data -> object dan didalamnya ada key "updatePelanggaran"
        expect(Object.keys(response._body)).toContain('updatePelanggaran')
    });
  
    it('400 - no input (negative case)', async function () {
    // 1. hit api-nya 
    // 2. make sure response status === 200
      const response = await request
        .put('/999')
        .send({ })
        .expect(400);
    // 3. make sure response data -> object dan didalamnya ada key "updatePelanggaran"
        expect(Object.keys(response._body)).toContain('updatePelanggaran')
    });
    return
});

describe('DELETE /:id', function () {
    it('200 - success (positive case)', async function () {
    // 1. hit api-nya 
    // 2. make sure response status === 200
      const response = await request
        .delete('/1')
        .expect(200);
    // 3. make sure response data -> object dan didalamnya ada key "updatePelanggaran"
        expect(Object.keys(response._body)).toContain('deletePelanggaran')
    })
    return
})