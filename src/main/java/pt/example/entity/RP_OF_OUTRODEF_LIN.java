package pt.example.entity;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "RP_OF_OUTRODEF_LIN")
public class RP_OF_OUTRODEF_LIN {

	private Integer ID_OUTROSDEF_LIN;
	private Integer ID_OP_LIN;
	private String ID_UTZ_CRIA;
	private String ID_UTZ_MODIF;
	private Integer ID_DEF_OUTRO;
	private Integer QUANT_OUTRODEF;
	private String RES_OUTRODEF;
	private String OBS_OUTRODEF;

	@Id
	@Column(name = "ID_OUTROSDEF_LIN")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Integer getID_OUTROSDEF_LIN() {
		return ID_OUTROSDEF_LIN;
	}

	@Column(name = "ID_OP_LIN")
	public Integer getID_OP_LIN() {
		return ID_OP_LIN;
	}

	@Column(name = "ID_UTZ_CRIA")
	public String getID_UTZ_CRIA() {
		return ID_UTZ_CRIA;
	}

	@Column(name = "ID_UTZ_MODIF")
	public String getID_UTZ_MODIF() {
		return ID_UTZ_MODIF;
	}

	@Column(name = "ID_DEF_OUTRO")
	public Integer getID_DEF_OUTRO() {
		return ID_DEF_OUTRO;
	}

	@Column(name = "QUANT_OUTRODEF")
	public Integer getQUANT_OUTRODEF() {
		return QUANT_OUTRODEF;
	}

	@Column(name = "RES_OUTRODEF")
	public String getRES_OUTRODEF() {
		return RES_OUTRODEF;
	}

	@Column(name = "OBS_OUTRODEF")
	public String getOBS_OUTRODEF() {
		return OBS_OUTRODEF;
	}

	public void setID_OUTROSDEF_LIN(Integer iD_OUTROSDEF_LIN) {
		ID_OUTROSDEF_LIN = iD_OUTROSDEF_LIN;
	}

	public void setID_OP_LIN(Integer iD_OP_LIN) {
		ID_OP_LIN = iD_OP_LIN;
	}

	public void setID_UTZ_CRIA(String iD_UTZ_CRIA) {
		ID_UTZ_CRIA = iD_UTZ_CRIA;
	}

	public void setID_UTZ_MODIF(String iD_UTZ_MODIF) {
		ID_UTZ_MODIF = iD_UTZ_MODIF;
	}

	public void setID_DEF_OUTRO(Integer iD_DEF_OUTRO) {
		ID_DEF_OUTRO = iD_DEF_OUTRO;
	}

	public void setQUANT_OUTRODEF(Integer qUANT_OUTRODEF) {
		QUANT_OUTRODEF = qUANT_OUTRODEF;
	}

	public void setRES_OUTRODEF(String rES_OUTRODEF) {
		RES_OUTRODEF = rES_OUTRODEF;
	}

	public void setOBS_OUTRODEF(String oBS_OUTRODEF) {
		OBS_OUTRODEF = oBS_OUTRODEF;
	}

}
