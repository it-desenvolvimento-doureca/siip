package pt.example.rest;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;

import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import pt.example.bootstrap.ConnectProgress;
import pt.example.entity.RP_CONF_OP_NPREV;

@Stateless
@Path("/demo")
public class DemoRest {

	@GET
	@Path("/silver/{ofnum}")
	@Produces("application/json")
	public List<HashMap<String, String>> silver(@PathParam("ofnum") String ofnum)
			throws SQLException, ClassNotFoundException {

		ConnectProgress connectionProgress = new ConnectProgress();

		List<HashMap<String, String>> dados = connectionProgress.getOF(ofnum);
		return dados;
	}

	@GET
	@Path("/operacao/{ofanumenr}")
	@Produces("application/json")
	public List<HashMap<String, String>> operacao(@PathParam("ofanumenr") String ofanumenr)
			throws SQLException, ClassNotFoundException {

		ConnectProgress connectionProgress = new ConnectProgress();

		List<HashMap<String, String>> dados = connectionProgress.getOP(ofanumenr);
		return dados;
	}
	
	@GET
	@Path("/operacaoTop1/{ofanumenr}")
	@Produces("application/json")
	public List<HashMap<String, String>> operacaoTop1(@PathParam("ofanumenr") String ofanumenr)
			throws SQLException, ClassNotFoundException {

		ConnectProgress connectionProgress = new ConnectProgress();

		List<HashMap<String, String>> dados = connectionProgress.getOPtop1(ofanumenr);
		return dados;
	}

	@GET
	@Path("/allop")
	@Produces("application/json")
	public List<HashMap<String, String>> allop() throws SQLException, ClassNotFoundException {

		ConnectProgress connectionProgress = new ConnectProgress();

		List<HashMap<String, String>> dados = connectionProgress.getallOP();
		return dados;
	}

	@GET
	@Path("/allopNOTIN/{data}")
	@Produces("application/json")
	public List<HashMap<String, String>> allopNOTIN(@PathParam("data") String data)
			throws SQLException, ClassNotFoundException {
		ConnectProgress connectionProgress = new ConnectProgress();

		List<HashMap<String, String>> dados = connectionProgress.getallOPNOTIN(data);
		return dados;
	}

	@GET
	@Path("/allfamNOTIN/{data}")
	@Produces("application/json")
	public List<HashMap<String, String>> allfamNOTIN(@PathParam("data") String data)
			throws SQLException, ClassNotFoundException {
		ConnectProgress connectionProgress = new ConnectProgress();

		List<HashMap<String, String>> dados = connectionProgress.getallfamNOTIN(data);
		return dados;
	}

	@GET
	@Path("/maquina/{SECNUMENR}")
	@Produces("application/json")
	public List<HashMap<String, String>> maquina(@PathParam("SECNUMENR") String SECNUMENR)
			throws SQLException, ClassNotFoundException {

		ConnectProgress connectionProgress = new ConnectProgress();

		List<HashMap<String, String>> dados = connectionProgress.getMaq(SECNUMENR);
		return dados;
	}

	@GET
	@Path("/allmaquina/{SECNUMENR}")
	@Produces("application/json")
	public List<HashMap<String, String>> Allmaquina(@PathParam("SECNUMENR") String SECCOD)
			throws SQLException, ClassNotFoundException {

		ConnectProgress connectionProgress = new ConnectProgress();

		List<HashMap<String, String>> dados = connectionProgress.getAllMaq(SECCOD);
		return dados;
	}

	@GET
	@Path("/tipofaltas")
	@Produces("application/json")
	public List<HashMap<String, String>> getTipoFalta() throws SQLException, ClassNotFoundException {

		ConnectProgress connectionProgress = new ConnectProgress();

		List<HashMap<String, String>> dados = connectionProgress.getTipoFalta();
		return dados;
	}

	@GET
	@Path("/users")
	@Produces("application/json")
	public List<HashMap<String, String>> getUsers() throws SQLException, ClassNotFoundException {

		ConnectProgress connectionProgress = new ConnectProgress();

		List<HashMap<String, String>> dados = connectionProgress.getUsers();
		return dados;
	}

	@GET
	@Path("/searchuser/{RESCOD}")
	@Produces("application/json")
	public List<HashMap<String, String>> getUser(@PathParam("RESCOD") String RESCOD)
			throws SQLException, ClassNotFoundException {

		ConnectProgress connectionProgress = new ConnectProgress();

		List<HashMap<String, String>> dados = connectionProgress.getUser(RESCOD);
		return dados;
	}

	@GET
	@Path("/sessoes")
	@Produces("application/json")
	public List<HashMap<String, String>> getSessoes() throws SQLException, ClassNotFoundException {

		ConnectProgress connectionProgress = new ConnectProgress();

		List<HashMap<String, String>> dados = connectionProgress.getSessoes();
		return dados;
	}

	@GET
	@Path("/getEtiqueta/{etiqueta}")
	@Produces("application/json")
	public List<HashMap<String, String>> getEtiqueta(@PathParam("etiqueta") String etiqueta)
			throws SQLException, ClassNotFoundException {

		ConnectProgress connectionProgress = new ConnectProgress();

		List<HashMap<String, String>> dados = connectionProgress.getEtiqueta(etiqueta);
		return dados;
	}
	
	@GET
	@Path("/referencias/{OFANUMENR}")
	@Produces("application/json")
	public List<HashMap<String, String>> getRef(@PathParam("OFANUMENR") String OFANUMENR)
			throws SQLException, ClassNotFoundException {

		ConnectProgress connectionProgress = new ConnectProgress();

		List<HashMap<String, String>> dados = connectionProgress.getRef(OFANUMENR);
		return dados;
	}
	
	@GET
	@Path("/familias")
	@Produces("application/json")
	public List<HashMap<String, String>> getFamilias() throws SQLException, ClassNotFoundException {

		ConnectProgress connectionProgress = new ConnectProgress();

		List<HashMap<String, String>> dados = connectionProgress.getFamilias();
		return dados;
	}
	
	@GET
	@Path("/getfilhos/{pai}")
	@Produces("application/json")
	public List<HashMap<String, String>> getfilhos(@PathParam("pai") String pai) throws SQLException, ClassNotFoundException {

		ConnectProgress connectionProgress = new ConnectProgress();

		List<HashMap<String, String>> dados = connectionProgress.getfilhos(pai);
		return dados;
	}

	@GET
	@Path("/defeitos/{fam}")
	@Produces("application/json")
	public List<HashMap<String, String>> getDefeitos(@PathParam("fam") String fam)
			throws SQLException, ClassNotFoundException {

		ConnectProgress connectionProgress = new ConnectProgress();

		List<HashMap<String, String>> dados = connectionProgress.getDefeitos(fam);
		return dados;
	}

}
