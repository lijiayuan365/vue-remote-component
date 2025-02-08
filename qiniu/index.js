const qiniu = require('qiniu');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// 七牛云配置
const QINIU_ACCESS_KEY = process.env.QINIU_ACCESS_KEY;
const QINIU_SECRET_KEY = process.env.QINIU_SECRET_KEY;
const QINIU_BUCKET = process.env.QINIU_BUCKET;
const QINIU_OSS_PRE = process.env.QINIU_OSS_PRE;

// 获取上传对象
const config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_as0; // 根据你的存储区域选择
const formUploader = new qiniu.form_up.FormUploader(config);
const putExtra = new qiniu.form_up.PutExtra();

// 获取上传token
const options = {
  scope: QINIU_BUCKET,
};
const mac = new qiniu.auth.digest.Mac(QINIU_ACCESS_KEY, QINIU_SECRET_KEY);
const putPolicy = new qiniu.rs.PutPolicy(options);
const uploadToken = putPolicy.uploadToken(mac);

/**
 * 上传目录下的所有文件
 * @param {*} localDirPath 目录路径
 * @param {*} remoteDirPath 七牛云bucket内路径
 * @returns 上传成功的文件 URL 列表
 */
async function uploadDirectory(localDirPath, remoteDirPath) {
  const files = fs.readdirSync(localDirPath);
  const uploadedFiles = [];
  for (const file of files) {
    const filePath = path.join(localDirPath, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      const subDirFiles = await uploadDirectory(filePath, path.join(remoteDirPath, file));
      uploadedFiles.push(...subDirFiles);
    } else {
      const resultOssPath = `${remoteDirPath}/${file}`;
      try {
        const fileUrl = await uploadFile(filePath, resultOssPath);
        uploadedFiles.push(fileUrl);
      } catch (error) {
        console.log('err', filePath, error);
      }
    }
  }
  return uploadedFiles;
}

/**
 * 上传文件
 * @param {*} localFile 本地文件路径
 * @param {*} key 七牛云路径
 * @returns 上传成功的文件 URL
 */
async function uploadFile(localFilePath, remotePath) {
  return new Promise((resolve, reject) => {
    formUploader.putFile(uploadToken, remotePath, localFilePath, putExtra, (respErr, respBody, respInfo) => {
      if (respErr) {
        reject(respErr);
      } else if (respInfo.statusCode === 200) {
        resolve(`${QINIU_OSS_PRE}/${remotePath}`);
      } else {
        reject(respBody);
      }
    });
  });
}


// 主函数
async function main() {
  const localDir = '../src/remote-com'; // 文件夹路径
  const remoteDir = 'project/vue-remote-components';
  const uploadedFiles = await uploadDirectory(localDir, remoteDir);
  try {
    fs.writeFileSync('output.json', JSON.stringify(uploadedFiles, null, 2));
    console.log('文件上传成功，路径已保存到 output.json');
  } catch (error) {
    console.error('上传失败:', error);
  }
}

main();  
