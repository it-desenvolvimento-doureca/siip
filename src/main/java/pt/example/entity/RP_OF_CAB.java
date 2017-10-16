package pt.example.entity;

import java.sql.Date;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "RP_OF_CAB")
public class RP_OF_CAB {

	private Integer ID_OF_CAB;
	private Integer ID_OF_CAB_ORIGEM;
	private String OF_NUM;
	private String OF_OBS;
	private String OP_COD;
	private String OP_COD_ORIGEM;
	private String OP_NUM;
	private String OP_DES;
	private String SEC_NUM;
	private String SEC_DES;
	private String MAQ_NUM;
	private String MAQ_DES;
	private String ID_UTZ_CRIA;
	private String NOME_UTZ_CRIA;
	private Timestamp DATA_HORA_CRIA;
	private String ID_UTZ_MODIF;
	private String NOME_UTZ_MODIF;
	private Timestamp DATA_HORA_MODIF;
	private String ESTADO;
	private String NUM_ETIQUETA;

	@Id
	@Column(name = "ID_OF_CAB")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Integer getID_OF_CAB() {
		return ID_OF_CAB;
	}

	@Column(name = "OF_NUM")
	public String getOF_NUM() {
		return OF_NUM;
	}

	@Column(name = "OP_DES")
	public String getOP_DES() {
		return OP_DES;
	}

	@Column(name = "SEC_NUM")
	public String getSEC_NUM() {
		return SEC_NUM;
	}

	@Column(name = "SEC_DES")
	public String getSEC_DES() {
		return SEC_DES;
	}

	@Column(name = "MAQ_NUM")
	public String getMAQ_NUM() {
		return MAQ_NUM;
	}

	@Column(name = "MAQ_DES")
	public String getMAQ_DES() {
		return MAQ_DES;
	}

	@Column(name = "ID_UTZ_CRIA")
	public String getID_UTZ_CRIA() {
		return ID_UTZ_CRIA;
	}

	@Column(name = "NOME_UTZ_CRIA")
	public String getNOME_UTZ_CRIA() {
		return NOME_UTZ_CRIA;
	}

	@Column(name = "DATA_HORA_CRIA")
	public Timestamp getDATA_HORA_CRIA() {
		return DATA_HORA_CRIA;
	}

	@Column(name = "ID_UTZ_MODIF")
	public String getID_UTZ_MODIF() {
		return ID_UTZ_MODIF;
	}

	@Column(name = "NOME_UTZ_MODIF")
	public String getNOME_UTZ_MODIF() {
		return NOME_UTZ_MODIF;
	}

	@Column(name = "DATA_HORA_MODIF")
	public Timestamp getDATA_HORA_MODIF() {
		return DATA_HORA_MODIF;
	}

	@Column(name = "ESTADO")
	public String getESTADO() {
		return ESTADO;
	}

	@Column(name = "OP_NUM")
	public String getOP_NUM() {
		return OP_NUM;
	}

	@Column(name = "OP_COD_ORIGEM")
	public String getOP_COD_ORIGEM() {
		return OP_COD_ORIGEM;
	}

	@Column(name = "NUM_ETIQUETA")
	public String getNUM_ETIQUETA() {
		return NUM_ETIQUETA;
	}

	public void setNUM_ETIQUETA(String nUM_ETIQUETA) {
		NUM_ETIQUETA = nUM_ETIQUETA;
	}

	public void setOP_COD_ORIGEM(String oP_COD_ORIGEM) {
		OP_COD_ORIGEM = oP_COD_ORIGEM;
	}

	public void setOP_NUM(String oP_NUM) {
		OP_NUM = oP_NUM;
	}

	public void setID_OF_CAB(Integer iD_OF_CAB) {
		ID_OF_CAB = iD_OF_CAB;
	}

	public void setOF_NUM(String oF_NUM) {
		OF_NUM = oF_NUM;
	}

	public void setOP_DES(String oP_DES) {
		OP_DES = oP_DES;
	}

	public void setSEC_NUM(String sEC_NUM) {
		SEC_NUM = sEC_NUM;
	}

	public void setSEC_DES(String sEC_DES) {
		SEC_DES = sEC_DES;
	}

	public void setMAQ_NUM(String mAQ_NUM) {
		MAQ_NUM = mAQ_NUM;
	}

	public void setMAQ_DES(String mAQ_DES) {
		MAQ_DES = mAQ_DES;
	}

	public void setID_UTZ_CRIA(String iD_UTZ_CRIA) {
		ID_UTZ_CRIA = iD_UTZ_CRIA;
	}

	public void setNOME_UTZ_CRIA(String nOME_UTZ_CRIA) {
		NOME_UTZ_CRIA = nOME_UTZ_CRIA;
	}

	public void setDATA_HORA_CRIA(Timestamp dATA_HORA_CRIA) {
		DATA_HORA_CRIA = dATA_HORA_CRIA;
	}

	public void setID_UTZ_MODIF(String iD_UTZ_MODIF) {
		ID_UTZ_MODIF = iD_UTZ_MODIF;
	}

	public void setNOME_UTZ_MODIF(String nOME_UTZ_MODIF) {
		NOME_UTZ_MODIF = nOME_UTZ_MODIF;
	}

	public void setDATA_HORA_MODIF(Timestamp dATA_HORA_MODIF) {
		DATA_HORA_MODIF = dATA_HORA_MODIF;
	}

	public void setESTADO(String eSTADO) {
		ESTADO = eSTADO;
	}

	@Column(name = "ID_OF_CAB_ORIGEM")
	public Integer getID_OF_CAB_ORIGEM() {
		return ID_OF_CAB_ORIGEM;
	}

	public void setID_OF_CAB_ORIGEM(Integer iD_OF_CAB_ORIGEM) {
		ID_OF_CAB_ORIGEM = iD_OF_CAB_ORIGEM;
	}

	@Column(name = "OF_OBS")
	public String getOF_OBS() {
		return OF_OBS;
	}

	@Column(name = "OP_COD")
	public String getOP_COD() {
		return OP_COD;
	}

	public void setOF_OBS(String oF_OBS) {
		OF_OBS = oF_OBS;
	}

	public void setOP_COD(String oP_COD) {
		OP_COD = oP_COD;
	}

}
