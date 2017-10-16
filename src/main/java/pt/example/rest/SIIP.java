package pt.example.rest;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import pt.example.bootstrap.ConnectProgress;
import pt.example.dao.RPCONFUTZPERFDao;
import pt.example.dao.RPOFDao;
import pt.example.dao.RP_CONF_CHEF_SECDao;
import pt.example.dao.RP_CONF_FAMILIA_COMPDao;
import pt.example.dao.RP_CONF_OPDao;
import pt.example.dao.RP_CONF_OP_NPREVDao;
import pt.example.dao.RP_OF_DEF_LINDao;
import pt.example.dao.RP_OF_OP_CABDao;
import pt.example.dao.RP_OF_OP_LINDao;
import pt.example.dao.RP_OF_OUTRODEF_LINDao;
import pt.example.dao.RP_OF_PARA_LINDao;
import pt.example.dao.RP_OF_PREP_LINDao;
import pt.example.dao.RP_OF_OP_FUNCDao;
import pt.example.dao.UserDao;
import pt.example.entity.RP_OF_CAB;
import pt.example.entity.RP_CONF_CHEF_SEC;
import pt.example.entity.RP_CONF_FAMILIA_COMP;
import pt.example.entity.RP_CONF_OP;
import pt.example.entity.RP_CONF_OP_NPREV;
import pt.example.entity.RP_OF_DEF_LIN;
import pt.example.entity.RP_OF_OP_CAB;
import pt.example.entity.RP_OF_OP_LIN;
import pt.example.entity.RP_OF_OUTRODEF_LIN;
import pt.example.entity.RP_OF_PARA_LIN;
import pt.example.entity.RP_OF_PREP_LIN;
import pt.example.entity.RP_OF_OP_FUNC;
import pt.example.entity.RP_CONF_UTZ_PERF;
import pt.example.entity.User;

@Stateless
@Path("/siip")
public class SIIP {

	@Inject
	private RPOFDao dao;

	@Inject
	private RPCONFUTZPERFDao dao1;

	@Inject
	private RP_CONF_CHEF_SECDao dao2;

	@Inject
	private RP_CONF_OPDao dao3;

	@Inject
	private RP_CONF_OP_NPREVDao dao4;

	@Inject
	private RP_OF_DEF_LINDao dao5;

	@Inject
	private RP_OF_OP_CABDao dao6;

	@Inject
	private RP_OF_OP_LINDao dao7;

	@Inject
	private RP_OF_PREP_LINDao dao8;

	@Inject
	private RP_OF_PARA_LINDao dao9;

	@Inject
	private RP_CONF_FAMILIA_COMPDao dao10;

	@Inject
	private RP_OF_OP_FUNCDao dao11;

	@Inject
	private RP_OF_OUTRODEF_LINDao dao12;

	// RP_CONF_UTZ_PERF***************************************************************
	@POST
	@Path("/createRP_CONF_UTZ_PERF")
	@Consumes("*/*")
	@Produces("application/json")
	public RP_CONF_UTZ_PERF insertRP_CONF_UTZ_PERF(final RP_CONF_UTZ_PERF data) {
		return dao1.create(data);
	}

	@GET
	@Path("/getRP_CONF_UTZ_PERF")
	@Produces("application/json")
	public List<RP_CONF_UTZ_PERF> getRP_CONF_UTZ_PERF() {
		return dao1.allEntries();
	}

	@GET
	@Path("/getRP_CONF_UTZ_PERFid/{id}")
	@Produces("application/json")
	public List<RP_CONF_UTZ_PERF> getRP_CONF_UTZ_PERF_id(@PathParam("id") String id) {
		return dao1.getbyid(id);
	}

	@DELETE
	@Path("/deleteRP_CONF_UTZ_PERF/{id}")
	public void deleteRP_CONF_UTZ_PERF(@PathParam("id") Integer id) {
		RP_CONF_UTZ_PERF RP_CONF_UTZ_PERF = new RP_CONF_UTZ_PERF();
		RP_CONF_UTZ_PERF.setID_CONF_UTZ_PERF(id);
		dao1.delete(RP_CONF_UTZ_PERF);
	}

	// RP_CONF_CHEF_SEC***************************************************************
	@POST
	@Path("/createRP_CONF_CHEF_SEC")
	@Consumes("*/*")
	@Produces("application/json")
	public RP_CONF_CHEF_SEC insertRP_CONF_CHEF_SECF(final RP_CONF_CHEF_SEC data) {
		return dao2.create(data);
	}

	@GET
	@Path("/getRP_CONF_CHEF_SEC")
	@Produces("application/json")
	public List<RP_CONF_CHEF_SEC> getRP_CONF_CHEF_SEC() {
		return dao2.allEntries();
	}

	@DELETE
	@Path("/deleteRP_CONF_CHEF_SEC/{id}")
	public void deleteRP_CONF_CHEF_SEC(@PathParam("id") Integer id) {
		RP_CONF_CHEF_SEC RP_CONF_CHEF_SEC = new RP_CONF_CHEF_SEC();
		RP_CONF_CHEF_SEC.setID_CONF_CHEF_SEC(id);
		dao2.delete(RP_CONF_CHEF_SEC);
	}

	@PUT
	@Path("/updateRP_CONF_CHEF_SEC")
	@Consumes("*/*")
	@Produces("application/json")
	public RP_CONF_CHEF_SEC updateuser(final RP_CONF_CHEF_SEC RP_CONF_CHEF_SEC) {
		RP_CONF_CHEF_SEC.setID_UTZ(RP_CONF_CHEF_SEC.getID_UTZ());
		return dao2.update(RP_CONF_CHEF_SEC);
	}

	// RP_CONF_OP***************************************************************

	@GET
	@Path("/getRP_CONF_OP")
	@Produces("application/json")
	public List<RP_CONF_OP> getRP_CONF_OP() {
		return dao3.getall();
	}

	@POST
	@Path("/createRP_CONF_OP")
	@Consumes("*/*")
	@Produces("application/json")
	public RP_CONF_OP insertRP_CONF_OP(final RP_CONF_OP data) {
		return dao3.create(data);
	}

	@DELETE
	@Path("/deleteRP_CONF_OP/{id}")
	public void deleteRP_CONF_OP(@PathParam("id") Integer id) {
		RP_CONF_OP RP_CONF_OP = new RP_CONF_OP();
		RP_CONF_OP.setID_CONF_OP(id);
		dao3.delete(RP_CONF_OP);
	}

	@PUT
	@Path("/updateRP_CONF_OP")
	@Consumes("*/*")
	@Produces("application/json")
	public RP_CONF_OP updateRP_CONF_OP(final RP_CONF_OP RP_CONF_OP) {
		RP_CONF_OP.setID_OP_PRINC(RP_CONF_OP.getID_OP_PRINC());
		return dao3.update(RP_CONF_OP);
	}

	@GET
	@Path("/getRP_CONF_OPbyid/{id}")
	@Produces("application/json")
	public List<RP_CONF_OP> getRP_CONF_OPbyid(@PathParam("id") String id) {
		return dao3.getbyid(id);
	}

	// RP_CONF_OP_NPREV***********************************************************

	@GET
	@Path("/getRP_CONF_OP_NPREV")
	@Produces("application/json")
	public List<RP_CONF_OP_NPREV> getRP_CONF_OP_NPREV() {
		return dao4.allEntries();
	}

	@POST
	@Path("/createRP_CONF_OP_NPREV")
	@Consumes("*/*")
	@Produces("application/json")
	public RP_CONF_OP_NPREV insertRP_CONF_OP_NPREV(final RP_CONF_OP_NPREV data) {
		return dao4.create(data);
	}

	@DELETE
	@Path("/deleteRP_CONF_OP_NPREV/{id}")
	public void deleteRP_CONF_OP_NPREV(@PathParam("id") Integer id) {
		RP_CONF_OP_NPREV RP_CONF_OP_NPREV = new RP_CONF_OP_NPREV();
		RP_CONF_OP_NPREV.setID_CONF_OP_NPREV(id);
		dao4.delete(RP_CONF_OP_NPREV);
	}

	// RP_OF_CAB***********************************************************

	@GET
	@Path("/getRP_OF_CAB")
	@Produces("application/json")
	public List<RP_OF_CAB> listof() {
		return dao.getall();
	}

	@GET
	@Path("/getRP_OF_CABbyid/{id}")
	@Produces("application/json")
	public List<RP_OF_CAB> listofbyid(@PathParam("id") Integer id) {
		return dao.getallbyid(id);
	}

	@GET
	@Path("/listofcurrentof/{id}")
	@Produces("application/json")
	public List<RP_OF_CAB> listofcurrentof(@PathParam("id") String id) {
		return dao.getbyid(id);
	}

	@GET
	@Path("/getof/{id}")
	@Produces("application/json")
	public List<RP_OF_CAB> getof(@PathParam("id") Integer id) {
		return dao.getof(id);
	}

	@GET
	@Path("/verifica/{of_num}/{op_cod}/{op_num}")
	@Produces("application/json")
	public List<RP_OF_CAB> verifica(@PathParam("of_num") String of_num, @PathParam("op_cod") String op_cod,
			@PathParam("op_num") String op_num) {
		return dao.verifica(of_num, op_cod, op_num);
	}

	@POST
	@Path("/createRP_OF_CAB")
	@Consumes("*/*")
	@Produces("application/json")
	public RP_OF_CAB insertRP_OF_CAB(final RP_OF_CAB data) {
		return dao.create(data);
	}

	@PUT
	@Path("/updateRP_OF_CAB")
	@Consumes("*/*")
	@Produces("application/json")
	public RP_OF_CAB updateRP_OF_CAB(final RP_OF_CAB RP_OF_CAB) {
		RP_OF_CAB.setESTADO(RP_OF_CAB.getESTADO());
		return dao.update(RP_OF_CAB);
	}

	// RP_OF_OP_CAB*************************************************************

	@POST
	@Path("/createRP_OF_OP_CAB")
	@Consumes("*/*")
	@Produces("application/json")
	public RP_OF_OP_CAB insertRP_OF_OP_CAB(final RP_OF_OP_CAB data) {
		return dao6.create(data);
	}

	@GET
	@Path("/getdataof/{id}/{user}/{estado}")
	@Produces("application/json")
	public List<RP_OF_OP_FUNC> getdataof(@PathParam("id") Integer id, @PathParam("user") String user,
			@PathParam("estado") String estado) {
		return dao11.getbyid(id, user, estado);
	}

	@GET
	@Path("/getRP_OF_OP_CABid/{id}")
	@Produces("application/json")
	public List<RP_OF_OP_CAB> getdataof(@PathParam("id") Integer id) {
		return dao6.getid(id);
	}

	@GET
	@Path("/getMaxID")
	@Produces("application/json")
	public List<Integer> getMaxID() {
		return dao6.getMaxID();
	}

	@PUT
	@Path("/updateRP_OF_OP_CAB")
	@Consumes("*/*")
	@Produces("application/json")
	public RP_OF_OP_CAB updateRP_OF_OP_CAB(final RP_OF_OP_CAB RP_OF_OP_CAB) {
		RP_OF_OP_CAB.setID_OF_CAB(RP_OF_OP_CAB.getID_OF_CAB());
		return dao6.update(RP_OF_OP_CAB);
	}

	// RP_OF_OP_LIN************************************************************

	@POST
	@Path("/createRP_OF_OP_LIN")
	@Consumes("*/*")
	@Produces("application/json")
	public RP_OF_OP_LIN insertRP_OF_OP_LIN(final RP_OF_OP_LIN data) {
		return dao7.create(data);
	}

	@GET
	@Path("/getRP_OF_OP_LINid/{id}")
	@Produces("application/json")
	public List<RP_OF_OP_LIN> getbyid(@PathParam("id") Integer id) {
		return dao7.getbyid(id);
	}

	@GET
	@Path("/getRP_OF_OP_LIN/{id}")
	@Produces("application/json")
	public List<RP_OF_OP_LIN> getid(@PathParam("id") Integer id) {
		return dao7.getid(id);
	}

	@GET
	@Path("/getRP_OF_OP_LINallid/{id}")
	@Produces("application/json")
	public List<RP_OF_OP_LIN> getallbyid(@PathParam("id") Integer id) {
		return dao7.getallbyid(id);
	}

	@GET
	@Path("/getRP_OF_OP_LINOp/{id}")
	@Produces("application/json")
	public List<RP_OF_OP_LIN> getop(@PathParam("id") Integer id) {
		return dao7.getop(id);
	}

	@PUT
	@Path("/updateRP_OF_OP_LIN")
	@Consumes("*/*")
	@Produces("application/json")
	public RP_OF_OP_LIN updateRP_OF_OP_LIN(final RP_OF_OP_LIN RP_OF_OP_LIN) {
		RP_OF_OP_LIN.setQUANT_DEF_TOTAL(RP_OF_OP_LIN.getQUANT_DEF_TOTAL());
		return dao7.update(RP_OF_OP_LIN);
	}

	// RP_OF_PREP_LIN***********************************
	@GET
	@Path("/getbyidRP_OF_PREP_LIN/{id}")
	@Produces("application/json")
	public List<RP_OF_PREP_LIN> getbyidRP_OF_PREP_LIN(@PathParam("id") Integer id) {
		return dao8.getbyid(id);
	}

	@POST
	@Path("/createRP_OF_PREP_LIN")
	@Consumes("*/*")
	@Produces("application/json")
	public RP_OF_PREP_LIN insertRP_OF_PREP_LIN(final RP_OF_PREP_LIN data) {
		return dao8.create(data);
	}

	@PUT
	@Path("/updateRP_OF_PREP_LIN")
	@Consumes("*/*")
	@Produces("application/json")
	public RP_OF_PREP_LIN updateRP_OF_PREP_LIN(final RP_OF_PREP_LIN RP_OF_PREP_LIN) {
		RP_OF_PREP_LIN.setESTADO(RP_OF_PREP_LIN.getESTADO());
		return dao8.update(RP_OF_PREP_LIN);
	}

	// RP_CONF_FAMILIA_COMP***********************************
	@GET
	@Path("/getRP_CONF_FAMILIA_COMP")
	@Produces("application/json")
	public List<RP_CONF_FAMILIA_COMP> getRP_CONF_FAMILIA_COMP() {
		return dao10.allEntries();
	}

	@GET
	@Path("/getRP_CONF_FAMILIA_COMPcodfam/{codfam}")
	@Produces("application/json")
	public List<RP_CONF_FAMILIA_COMP> getRP_CONF_FAMILIA_COMPcodfam(@PathParam("codfam") String codfam) {
		return dao10.getbycodfam(codfam);
	}

	@POST
	@Path("/createRP_CONF_FAMILIA_COMP")
	@Consumes("*/*")
	@Produces("application/json")
	public RP_CONF_FAMILIA_COMP insertRP_CONF_FAMILIA_COMP(final RP_CONF_FAMILIA_COMP data) {
		return dao10.create(data);
	}

	@PUT
	@Path("/updateRP_CONF_FAMILIA_COMP")
	@Consumes("*/*")
	@Produces("application/json")
	public RP_CONF_FAMILIA_COMP updateRP_CONF_FAMILIA_COMP(final RP_CONF_FAMILIA_COMP RP_CONF_FAMILIA_COMP) {
		RP_CONF_FAMILIA_COMP.setCOD_FAMILIA_COMP(RP_CONF_FAMILIA_COMP.getCOD_FAMILIA_COMP());
		return dao10.update(RP_CONF_FAMILIA_COMP);
	}

	@DELETE
	@Path("/deleteRP_CONF_FAMILIA_COMP/{id}")
	public void deleteRP_CONF_FAMILIA_COMP(@PathParam("id") String id) {
		RP_CONF_FAMILIA_COMP RP_CONF_FAMILIA_COMP = new RP_CONF_FAMILIA_COMP();
		RP_CONF_FAMILIA_COMP.setCOD_FAMILIA_COMP(id);
		dao10.delete(RP_CONF_FAMILIA_COMP);
	}

	// RP_OF_OP_FUNC***********************************
	@GET
	@Path("/getbyidRP_OF_OP_FUNC")
	@Produces("application/json")
	public List<RP_OF_OP_FUNC> getRP_OF_OP_FUNC() {
		return dao11.allEntries();
	}

	@POST
	@Path("/createRP_OF_OP_FUNC")
	@Consumes("*/*")
	@Produces("application/json")
	public RP_OF_OP_FUNC insertRP_OF_OP_FUNC(final RP_OF_OP_FUNC data) {
		return dao11.create(data);
	}

	@PUT
	@Path("/updateRP_OF_OP_FUNC")
	@Consumes("*/*")
	@Produces("application/json")
	public RP_OF_OP_FUNC updateRP_OF_OP_FUNC(final RP_OF_OP_FUNC RP_OF_OP_FUNC) {
		RP_OF_OP_FUNC.setID_OP_FUNC(RP_OF_OP_FUNC.getID_OP_FUNC());
		return dao11.update(RP_OF_OP_FUNC);
	}

	@GET
	@Path("/checkuser/{user}")
	@Produces("application/json")
	public List<RP_OF_OP_FUNC> checkuser(@PathParam("user") String user) {
		return dao11.checkuser(user);
	}

	@GET
	@Path("/getRP_OF_OP_FUNCid/{id}/{user}")
	@Produces("application/json")
	public List<RP_OF_OP_FUNC> getRP_OF_OP_FUNCid(@PathParam("id") Integer id, @PathParam("user") String user) {
		return dao11.getbyallID_OP_CAB(id, user);
	}

	@GET
	@Path("/getRP_OF_OP_FUNCusers/{id}")
	@Produces("application/json")
	public List<RP_OF_OP_FUNC> getRP_OF_OP_FUNC_users(@PathParam("id") Integer id) {
		return dao11.getUsers(id);
	}

	// RP_OF_PARA_LIN******************************************

	@GET
	@Path("/getbyallID_OP_CAB/{id}")
	@Produces("application/json")
	public List<RP_OF_PARA_LIN> getbyallID_OP_CAB(@PathParam("id") Integer id) {
		return dao9.getbyallID_OP_CAB(id);
	}

	@GET
	@Path("/getbyidRP_OF_PARA_LIN/{id}")
	@Produces("application/json")
	public List<RP_OF_PARA_LIN> getbyidRP_OF_PARA_LIN(@PathParam("id") Integer id) {
		return dao9.getbyid(id);
	}

	@GET
	@Path("/getbyid_op_cabRP_OF_PARA_LIN/{id}")
	@Produces("application/json")
	public List<RP_OF_PARA_LIN> getbyid_op_cabRP_OF_PARA_LIN(@PathParam("id") Integer id) {
		return dao9.getbyid_op_cab(id);
	}

	@POST
	@Path("/createRP_OF_PARA_LIN")
	@Consumes("*/*")
	@Produces("application/json")
	public RP_OF_PARA_LIN insertRP_OF_PARA_LIN(final RP_OF_PARA_LIN data) {
		return dao9.create(data);
	}

	@PUT
	@Path("/updateRP_OF_PARA_LIN")
	@Consumes("*/*")
	@Produces("application/json")
	public RP_OF_PARA_LIN updateRP_OF_PARA_LIN(final RP_OF_PARA_LIN RP_OF_PARA_LIN) {
		RP_OF_PARA_LIN.setESTADO(RP_OF_PARA_LIN.getESTADO());
		return dao9.update(RP_OF_PARA_LIN);
	}

	// RP_OF_DEF_LIN********************************************

	@POST
	@Path("/createRP_OF_DEF_LIN")
	@Consumes("*/*")
	@Produces("application/json")
	public RP_OF_DEF_LIN insertRP_OF_DEF_LIN(final RP_OF_DEF_LIN data) {
		return dao5.create(data);
	}

	@GET
	@Path("/getbyidRP_OF_DEF_LIN/{id}/{id2}")
	@Produces("application/json")
	public List<RP_OF_DEF_LIN> getbyRP_OF_DEF_LIN(@PathParam("id") String id, @PathParam("id2") Integer id2) {
		return dao5.getbyid(id, id2);
	}

	@GET
	@Path("/getbyidRP_OF_DEF_LINidoplin/{id}")
	@Produces("application/json")
	public List<RP_OF_DEF_LIN> getbyid_op_lin(@PathParam("id") Integer id) {
		return dao5.getbyid_op_lin(id);
	}

	@GET
	@Path("/getbyidDEF/{id}")
	@Produces("application/json")
	public List<RP_OF_DEF_LIN> getbyidDEF(@PathParam("id") Integer id) {
		return dao5.getbyidDEF(id);
	}

	@PUT
	@Path("/updateRP_OF_DEF_LIN")
	@Consumes("*/*")
	@Produces("application/json")
	public RP_OF_DEF_LIN updateRP_OF_DEF_LIN(final RP_OF_DEF_LIN RP_OF_DEF_LIN) {
		RP_OF_DEF_LIN.setQUANT_DEF(RP_OF_DEF_LIN.getQUANT_DEF());
		return dao5.update(RP_OF_DEF_LIN);
	}

	@DELETE
	@Path("/deleteRP_OF_DEF_LIN/{id}")
	public void deleteRP_OF_DEF_LIN(@PathParam("id") Integer id) {
		dao5.apagar_id_op_lin(id);
	}
	// RP_OF_OUTRODEF_LIN****************************************************

	@POST
	@Path("/createRP_OF_OUTRODEF_LIN")
	@Consumes("*/*")
	@Produces("application/json")
	public RP_OF_OUTRODEF_LIN insertRP_OF_OUTRODEF_LIN(final RP_OF_OUTRODEF_LIN data) {
		return dao12.create(data);
	}

	@GET
	@Path("/getbyidRP_OF_OUTRODEF_LINF/{id}")
	@Produces("application/json")
	public List<RP_OF_OUTRODEF_LIN> getbyidRP_OF_OUTRODEF_LIN(@PathParam("id") Integer id) {
		return dao12.getbyid(id);
	}

	@PUT
	@Path("/updateRP_OF_OUTRODEF_LIN")
	@Consumes("*/*")
	@Produces("application/json")
	public RP_OF_OUTRODEF_LIN updateRP_OF_OUTRODEF_LIN(final RP_OF_OUTRODEF_LIN RP_OF_OUTRODEF_LIN) {
		RP_OF_OUTRODEF_LIN.setQUANT_OUTRODEF(RP_OF_OUTRODEF_LIN.getQUANT_OUTRODEF());
		return dao12.update(RP_OF_OUTRODEF_LIN);
	}

	// CRIAR
	// FICHEIRO****************************************************************

	@GET
	@Path("/ficheiro")
	@Produces("application/json")
	public void getFicheiro() throws IOException {
		BufferedWriter bw = null;
		FileWriter fw = null;
		String path = "C:" + File.separator + "hello" + File.separator + "hi.txt";

		try {

			String data = "Campo1: \r\n" + "Campo2:\r\n" + "Campo3:\r\n" + "Campo4:";

			File file = new File(path);

			// if file doesnt exists, then create it

			file.createNewFile();

			// true = append file
			fw = new FileWriter(file.getAbsoluteFile(), true);
			bw = new BufferedWriter(fw);

			bw.write(data);

			System.out.println("Done");

		} catch (IOException e) {

			e.printStackTrace();

		} finally {

			try {

				if (bw != null)
					bw.close();

				if (fw != null)
					fw.close();

			} catch (IOException ex) {

				ex.printStackTrace();

			}
		}

	}

}
