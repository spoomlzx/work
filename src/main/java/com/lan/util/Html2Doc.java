package com.lan.util;

/**
 * package com.zzc.util
 *
 * @author spoomlzx
 * @date 2017/3/18
 */
public class Html2Doc {


//    public static void main(String args[]){
//        String content="<p style='font-family: 宋体; line-height: 28.8px; white-space: normal; text-align: center; background-color: rgb(255, 255, 255);'><strong><span style='font-size: 24px;'>国务院关于修改《全国年节及纪念日<br/>放假办法》的决定</span></strong></p><p style='font-family: 宋体; line-height: 28.8px; text-indent: 0em; white-space: normal; background-color: rgb(255, 255, 255);'>&nbsp;&nbsp;&nbsp;&nbsp;国务院决定对《全国年节及纪念日放假办法》作如下修改：<br/>&nbsp;&nbsp;&nbsp;&nbsp;将第二条第二项修改为：“（二）春节，放假3天（农历正月初一、初二、初三）”。<br/>&nbsp;&nbsp;&nbsp;&nbsp;本决定自2014年1月1日起施行。<br/>&nbsp;&nbsp;&nbsp;&nbsp;《全国年节及纪念日放假办法》根据本决定作相应修改，重新公布。</p><p style='font-family: 宋体; line-height: 28.8px; text-indent: 0em; white-space: normal; background-color: rgb(255, 255, 255);'>&nbsp;</p><p style='font-family: 宋体; line-height: 28.8px; text-indent: 0em; white-space: normal; text-align: center; background-color: rgb(255, 255, 255);'><strong><span style='font-size: 24px;'>全国年节及纪念日放假办法</span></strong></p><p style='font-family: 宋体; line-height: 28.8px; white-space: normal; text-indent: 2em; background-color: rgb(255, 255, 255);'><span style='font-family: 楷体, 楷体_gb2312, simkai;'>(1949年12月23日政务院发布　根据1999年9月18日《国务院关于修改〈全国年节及纪念日放假办法〉的决定》第一次修订　根据2007年12月14日《国务院关于修改〈全国年节及纪念日放假办法〉的决定》第二次修订　根据2013年12月11日《国务院关于修改〈全国年节及纪念日放假办法〉的决定》第三次修订)</span></p><p style='font-family: 宋体; line-height: 28.8px; text-indent: 0em; white-space: normal; background-color: rgb(255, 255, 255);'><strong>&nbsp;&nbsp;&nbsp;&nbsp;第一条</strong>　为统一全国年节及纪念日的假期，制定本办法。<br/><strong>&nbsp;&nbsp;&nbsp;&nbsp;第二条</strong>　全体公民放假的节日：<br/>&nbsp;&nbsp;&nbsp;&nbsp;（一）新年，放假1天(1月1日)；<br/>&nbsp;&nbsp;&nbsp;&nbsp;（二）春节，放假3天(农历正月初一、初二、初三)；<br/>&nbsp;&nbsp;&nbsp;&nbsp;（三）清明节，放假1天(农历清明当日)；<br/>&nbsp;&nbsp;&nbsp;&nbsp;（四）劳动节，放假1天(5月1日)；<br/>&nbsp;&nbsp;&nbsp;&nbsp;（五）端午节，放假1天(农历端午当日)；<br/>&nbsp;&nbsp;&nbsp;&nbsp;（六）中秋节，放假1天(农历中秋当日)；<br/>&nbsp;&nbsp;&nbsp;&nbsp;（七）国庆节，放假3天(10月1日、2日、3日)。<br/><strong>&nbsp;&nbsp;&nbsp;&nbsp;第三条</strong>　部分公民放假的节日及纪念日：<br/>&nbsp;&nbsp;&nbsp;&nbsp;（一）妇女节(3月8日)，妇女放假半天；<br/>&nbsp;&nbsp;&nbsp;&nbsp;（二）青年节(5月4日)，14周岁以上的青年放假半天；<br/>&nbsp;&nbsp;&nbsp;&nbsp;（三）儿童节(6月1日)，不满14周岁的少年儿童放假1天；<br/>&nbsp;&nbsp;&nbsp;&nbsp;（四）中国人民解放军建军纪念日(8月1日)，现役军人放假半天。<br/><strong>&nbsp;&nbsp;&nbsp;&nbsp;第四条</strong>　少数民族习惯的节日，由各少数民族聚居地区的地方人民政府，按照各该民族习惯，规定放假日期。<br/><strong>&nbsp;&nbsp;&nbsp;&nbsp;第五条</strong>　二七纪念日、五卅纪念日、七七抗战纪念日、九三抗战胜利纪念日、九一八纪念日、教师节、护士节、记者节、植树节等其他节日、纪念日，均不放假。<br/><strong>&nbsp;&nbsp;&nbsp;&nbsp;第六条</strong>　全体公民放假的假日，如果适逢星期六、星期日，应当在工作日补假。部分公民放假的假日，如果适逢星期六、星期日，则不补假。<br/><strong>&nbsp;&nbsp;&nbsp;&nbsp;第七条</strong>　本办法自公布之日起施行。</p><p><br/></p>'";
//        try {
//            writeWordFile(content,"test.doc","D:/");
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//    }

//    public static boolean writeWordFile(String content,String filename,String path) throws IOException {
//
//        String head = "<html><div style=\"text-align: center\"><span style=\"font-size: 28px\"><span style=\"font-family: 黑体\">导出word文档<br /> <br /> </span></span></div>";
//        String tail = "</html>";
//        content = head + content + tail;
//        ByteArrayInputStream bais = null;
//        FileOutputStream ostream = null;
//        try{
//            if (!"".equals(path)){
//                File fileDir = new File(path);
//                if(!fileDir.exists())
//                    fileDir.mkdirs();
//                if (fileDir.exists()) {
//
//                    String fileName = filename;
//                    byte b[] = content.getBytes("GBK");
//                    bais = new ByteArrayInputStream(b);
//                    POIFSFileSystem poifs = new POIFSFileSystem();
//                    DirectoryEntry directory = poifs.getRoot();
//                    DocumentEntry documentEntry = directory.createDocument("WordDocument", bais);
//                    ostream = new FileOutputStream(path+ fileName);
//                    poifs.writeFilesystem(ostream);
//                    bais.close();
//                    ostream.close();
//                }
//            }
//        }catch(IOException e){
//            bais.close();
//            ostream.close();
//            e.printStackTrace();
//            throw e;
//        }
//        return true;
//    }

}
