package pt.example.entity;

import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "RP_OF_OP_FUNC")
public class RP_OF_OP_FUNC {

	private Integer ID_OP_FUNC;
	private Integer ID_OP_CAB;
	private Date DATA_INI;
	private Time HORA_INI;
	private Date DATA_FIM;
	private Time HORA_FIM;
	private String ID_EQUIPA;
	private String ID_UTZ_CRIA;
	private String NOME_UTZ_CRIA;
	private String PERFIL_CRIA;
	private String ID_UTZ_MODIF;
	private String NOME_UTZ_MODIF;
	private String PERFIL_MODIF;
	private Timestamp DATA_HORA_MODIF;
	private String ESTADO;

	@Id
	@Column(name = "ID_OP_FUNC")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Integer getID_OP_FUNC() {
		return ID_OP_FUNC;
	}

	@Column(name = "ID_OP_CAB")
	public Integer getID_OP_CAB() {
		return ID_OP_CAB;
	}

	@Column(name = "DATA_INI")
	public Date getDATA_INI() {
		return DATA_INI;
	}

	@Column(name = "HORA_INI")
	public Time getHORA_INI() {
		return HORA_INI;
	}

	@Column(name = "DATA_FIM")
	public Date getDATA_FIM() {
		return DATA_FIM;
	}

	@Column(name = "HORA_FIM")
	public Time getHORA_FIM() {
		return HORA_FIM;
	}

	@Column(name = "ID_UTZ_CRIA")
	public String getID_UTZ_CRIA() {
		return ID_UTZ_CRIA;
	}

	@Column(name = "ID_UTZ_MODIF")
	public String getID_UTZ_MODIF() {
		return ID_UTZ_MODIF;
	}

	@Column(name = "DATA_HORA_MODIF")
	public Timestamp getDATA_HORA_MODIF() {
		return DATA_HORA_MODIF;
	}

	@Column(name = "ESTADO")
	public String getESTADO() {
		return ESTADO;
	}

	@Column(name = "ID_EQUIPA")
	public String getID_EQUIPA() {
		return ID_EQUIPA;
	}

	@Column(name = "NOME_UTZ_CRIA")
	public String getNOME_UTZ_CRIA() {
		return NOME_UTZ_CRIA;
	}

	@Column(name = "PERFIL_CRIA")
	public String getPERFIL_CRIA() {
		return PERFIL_CRIA;
	}

	@Column(name = "NOME_UTZ_MODIF")
	public String getNOME_UTZ_MODIF() {
		return NOME_UTZ_MODIF;
	}

	@Column(name = "PERFIL_MODIF")
	public String getPERFIL_MODIF() {
		return PERFIL_MODIF;
	}

	public void setID_OP_FUNC(Integer iD_OP_FUNC) {
		ID_OP_FUNC = iD_OP_FUNC;
	}

	public void setID_OP_CAB(Integer iD_OP_CAB) {
		ID_OP_CAB = iD_OP_CAB;
	}

	public void setID_EQUIPA(String iD_EQUIPA) {
		ID_EQUIPA = iD_EQUIPA;
	}

	public void setNOME_UTZ_CRIA(String nOME_UTZ_CRIA) {
		NOME_UTZ_CRIA = nOME_UTZ_CRIA;
	}

	public void setPERFIL_CRIA(String pERFIL_CRIA) {
		PERFIL_CRIA = pERFIL_CRIA;
	}

	public void setNOME_UTZ_MODIF(String nOME_UTZ_MODIF) {
		NOME_UTZ_MODIF = nOME_UTZ_MODIF;
	}

	public void setPERFIL_MODIF(String pERFIL_MODIF) {
		PERFIL_MODIF = pERFIL_MODIF;
	}


	public void setDATA_INI(Date dATA_INI) {
		DATA_INI = dATA_INI;
	}

	public void setHORA_INI(Time hORA_INI) {
		HORA_INI = hORA_INI;
	}

	public void setDATA_FIM(Date dATA_FIM) {
		DATA_FIM = dATA_FIM;
	}

	public void setHORA_FIM(Time hORA_FIM) {
		HORA_FIM = hORA_FIM;
	}

	public void setID_UTZ_CRIA(String iD_UTZ_CRIA) {
		ID_UTZ_CRIA = iD_UTZ_CRIA;
	}

	public void setID_UTZ_MODIF(String iD_UTZ_MODIF) {
		ID_UTZ_MODIF = iD_UTZ_MODIF;
	}

	public void setDATA_HORA_MODIF(Timestamp dATA_HORA_MODIF) {
		DATA_HORA_MODIF = dATA_HORA_MODIF;
	}

	public void setESTADO(String eSTADO) {
		ESTADO = eSTADO;
	}

}
